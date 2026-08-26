using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using TuitionServer.Data;
using TuitionServer.Endpoints;
using TuitionServer.Services;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

// --- Database (SQLite) ------------------------------------------------------
var dbPath = Path.Combine(builder.Environment.ContentRootPath, "tuition.db");
builder.Services.AddDbContext<AppDbContext>(o => o.UseSqlite($"Data Source={dbPath}"));

// --- Email sender -----------------------------------------------------------
builder.Services.AddSingleton<EmailSender>();

// Persist data-protection keys (for auth cookies) so restarts/redeploys don't
// invalidate everyone's session.
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(Path.Combine(builder.Environment.ContentRootPath, "keys")));

// --- Cookie authentication for the teacher portal ---------------------------
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o =>
    {
        o.Cookie.Name = "vv_auth";
        o.Cookie.HttpOnly = true;
        o.Cookie.SameSite = SameSiteMode.Lax;
        // Require HTTPS for the auth cookie in production (behind nginx TLS),
        // but allow http in local development.
        o.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
            ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
        o.LoginPath = "/admin/login";
        o.ExpireTimeSpan = TimeSpan.FromDays(7);
        o.SlidingExpiration = true;
        // API calls should get 401 (not an HTML redirect) when unauthenticated.
        o.Events.OnRedirectToLogin = ctx =>
        {
            if (ctx.Request.Path.StartsWithSegments("/api"))
            {
                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            }
            ctx.Response.Redirect(ctx.RedirectUri);
            return Task.CompletedTask;
        };
    });
builder.Services.AddAuthorization(o =>
{
    o.AddPolicy("Teacher", p => p.RequireAuthenticatedUser().RequireRole("Teacher"));
    o.AddPolicy("Parent", p => p.RequireAuthenticatedUser().RequireRole("Parent"));
});

var app = builder.Build();

// Create & seed the database on startup.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    AppDbContext.EnsureSeeded(db, logger);
}

// Behind the nginx reverse proxy: honour X-Forwarded-Proto/For so the app
// knows requests arrived over HTTPS (needed for secure cookies).
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseExceptionHandler();
if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseAuthentication();
app.UseAuthorization();

// Clean URLs: 301 any "*.html" to its extensionless URL, and internally serve
// "/about" from "about.html" so the site looks like a proper website.
var webRoot = app.Environment.WebRootPath ?? Path.Combine(app.Environment.ContentRootPath, "wwwroot");
app.Use(async (ctx, next) =>
{
    var req = ctx.Request;
    var path = req.Path.Value ?? "/";
    if (!path.StartsWith("/api", StringComparison.OrdinalIgnoreCase))
    {
        if (path.EndsWith(".html", StringComparison.OrdinalIgnoreCase))
        {
            var clean = path[..^5];                          // strip ".html"
            if (clean.EndsWith("/index")) clean = clean[..^5]; // ".../index" -> ".../"
            if (clean.Length == 0) clean = "/";
            ctx.Response.StatusCode = StatusCodes.Status301MovedPermanently;
            ctx.Response.Headers.Location = clean + req.QueryString;
            return;
        }
        // Extensionless -> serve the matching .html file if it exists
        if (!Path.HasExtension(path) && path != "/" && !path.EndsWith("/"))
        {
            var rel = path.TrimStart('/').Replace('/', Path.DirectorySeparatorChar) + ".html";
            if (File.Exists(Path.Combine(webRoot, rel)))
                req.Path = path + ".html";
        }
    }
    await next();
});

// Protect the portal pages. Teachers -> /admin, parents -> /parent. Login pages
// and assets stay public. Wrong-role users are bounced to the right login.
static bool IsProtectedPage(string path, string area) =>
    path.StartsWith(area, StringComparison.OrdinalIgnoreCase)
    && !path.StartsWith(area + "/assets", StringComparison.OrdinalIgnoreCase)
    && !path.Equals(area + "/login.html", StringComparison.OrdinalIgnoreCase)
    && (path.EndsWith(".html", StringComparison.OrdinalIgnoreCase)
        || path.Equals(area, StringComparison.OrdinalIgnoreCase)
        || path.Equals(area + "/", StringComparison.OrdinalIgnoreCase));

app.Use(async (ctx, next) =>
{
    var path = ctx.Request.Path.Value ?? "";
    var authed = ctx.User.Identity?.IsAuthenticated ?? false;
    if (IsProtectedPage(path, "/admin") && !(authed && ctx.User.IsInRole("Teacher")))
    {
        ctx.Response.Redirect("/admin/login");
        return;
    }
    if (IsProtectedPage(path, "/parent") && !(authed && ctx.User.IsInRole("Parent")))
    {
        ctx.Response.Redirect("/parent/login");
        return;
    }
    await next();
});

// ---------------------------------------------------------------------------
// Public enquiry endpoint (from the website's contact form).
// ---------------------------------------------------------------------------
var enrollmentsFile = Path.Combine(app.Environment.ContentRootPath, "enrollments.json");
var fileLock = new object();
var publicApi = app.MapGroup("/api");

publicApi.MapPost("enroll", async (EnrollmentRequest request, ILogger<Program> logger, AppDbContext db, EmailSender email) =>
{
    if (string.IsNullOrWhiteSpace(request.ParentName)
        || string.IsNullOrWhiteSpace(request.StudentName)
        || string.IsNullOrWhiteSpace(request.Phone))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["form"] = ["Parent name, student name and phone number are required."]
        });
    }

    var record = new EnrollmentRecord(Guid.NewGuid(), DateTimeOffset.UtcNow,
        request.ParentName.Trim(), request.StudentName.Trim(), request.StudentClass?.Trim() ?? "",
        request.Subjects?.Trim() ?? "", request.Phone.Trim(), request.Message?.Trim() ?? "");

    logger.LogInformation("New enquiry from {Parent} for {Student} ({Class}) — {Phone}",
        record.ParentName, record.StudentName, record.StudentClass, record.Phone);

    try
    {
        lock (fileLock)
        {
            List<EnrollmentRecord> all = File.Exists(enrollmentsFile)
                ? JsonSerializer.Deserialize<List<EnrollmentRecord>>(File.ReadAllText(enrollmentsFile)) ?? []
                : [];
            all.Add(record);
            File.WriteAllText(enrollmentsFile, JsonSerializer.Serialize(all, new JsonSerializerOptions { WriteIndented = true }));
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Could not persist enrollment to {File}", enrollmentsFile);
    }

    // Email every teacher the full enquiry details (sent from the configured Gmail).
    try
    {
        if (email.IsConfigured)
        {
            var html = BuildEnquiryEmail(record);
            var subject = $"New tuition enquiry — {record.StudentName} ({record.StudentClass})";
            var teachers = await db.Teachers.Select(t => new { t.Name, t.Email }).ToListAsync();
            foreach (var t in teachers)
                if (!string.IsNullOrWhiteSpace(t.Email) && t.Email.Contains('@'))
                    await email.SendAsync(t.Email, t.Name, subject, html);
        }
        else
        {
            logger.LogWarning("Enquiry received but email is not configured; teachers not notified.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Could not email enquiry to teachers.");
    }

    return Results.Ok(new { ok = true, id = record.Id });

    static string BuildEnquiryEmail(EnrollmentRecord r)
    {
        static string E(string s) => System.Net.WebUtility.HtmlEncode(s ?? "");
        var ist = r.ReceivedAt.ToOffset(TimeSpan.FromHours(5.5)).ToString("dd MMM yyyy, h:mm tt") + " IST";
        return $@"<div style=""font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#3D342A"">
  <div style=""background:#E07A5F;color:#fff;padding:18px 22px;border-radius:12px 12px 0 0"">
    <div style=""font-size:18px;font-weight:bold"">🌳 Vidya Vriksh Tuition</div>
    <div style=""opacity:.9;font-size:13px"">New enquiry from the website</div>
  </div>
  <div style=""border:1px solid #F6D9C6;border-top:none;border-radius:0 0 12px 12px;padding:20px"">
    <table style=""width:100%;border-collapse:collapse;font-size:14px"">
      <tr><td style=""padding:6px 0;color:#7D7264;width:120px"">Parent</td><td style=""padding:6px 0;font-weight:bold"">{E(r.ParentName)}</td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Student</td><td style=""padding:6px 0;font-weight:bold"">{E(r.StudentName)}</td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Class</td><td style=""padding:6px 0"">{E(r.StudentClass)}</td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Subjects</td><td style=""padding:6px 0"">{E(r.Subjects)}</td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Phone</td><td style=""padding:6px 0""><a href=""tel:{E(r.Phone)}"">{E(r.Phone)}</a></td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Message</td><td style=""padding:6px 0"">{E(r.Message)}</td></tr>
      <tr><td style=""padding:6px 0;color:#7D7264"">Received</td><td style=""padding:6px 0"">{ist}</td></tr>
    </table>
    <p style=""margin-top:16px;color:#7D7264;font-size:13px"">Please reach out to the parent soon.</p>
  </div>
</div>";
    }
});

// ---------------------------------------------------------------------------
// Teacher portal API (auth, teachers, students, tests, marks, reports, email).
// ---------------------------------------------------------------------------
app.MapAdminApi();
app.MapParentApi();

app.MapDefaultEndpoints();

// Serve static files with cache headers that make updates appear immediately:
// HTML/CSS/JS always revalidate (ETag -> 304 if unchanged, fresh copy if changed),
// while images/fonts cache for a day. No browser hard-refresh / incognito needed.
app.UseFileServer(new FileServerOptions
{
    StaticFileOptions =
    {
        OnPrepareResponse = ctx =>
        {
            var name = ctx.File.Name.ToLowerInvariant();
            var headers = ctx.Context.Response.Headers;
            if (name.EndsWith(".html") || name.EndsWith(".css") || name.EndsWith(".js"))
                headers.CacheControl = "no-cache";
            else
                headers.CacheControl = "public, max-age=86400";
        }
    }
});

app.Run();

record EnrollmentRequest(string ParentName, string StudentName, string? StudentClass, string? Subjects, string Phone, string? Message);
record EnrollmentRecord(Guid Id, DateTimeOffset ReceivedAt, string ParentName, string StudentName, string StudentClass, string Subjects, string Phone, string Message);

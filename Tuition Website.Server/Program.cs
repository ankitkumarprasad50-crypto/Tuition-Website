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
        o.LoginPath = "/admin/login.html";
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
builder.Services.AddAuthorization();

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

// Protect the admin HTML pages (login page + admin assets stay public).
app.Use(async (ctx, next) =>
{
    var path = ctx.Request.Path.Value ?? "";
    var isAdminPage = path.StartsWith("/admin", StringComparison.OrdinalIgnoreCase)
        && !path.StartsWith("/admin/assets", StringComparison.OrdinalIgnoreCase)
        && !path.Equals("/admin/login.html", StringComparison.OrdinalIgnoreCase)
        && (path.EndsWith(".html", StringComparison.OrdinalIgnoreCase)
            || path.Equals("/admin", StringComparison.OrdinalIgnoreCase)
            || path.Equals("/admin/", StringComparison.OrdinalIgnoreCase));
    if (isAdminPage && !(ctx.User.Identity?.IsAuthenticated ?? false))
    {
        ctx.Response.Redirect("/admin/login.html");
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

publicApi.MapPost("enroll", (EnrollmentRequest request, ILogger<Program> logger) =>
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

    return Results.Ok(new { ok = true, id = record.Id });
});

// ---------------------------------------------------------------------------
// Teacher portal API (auth, teachers, students, tests, marks, reports, email).
// ---------------------------------------------------------------------------
app.MapAdminApi();

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

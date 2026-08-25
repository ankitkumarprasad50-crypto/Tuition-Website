using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
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

// --- Cookie authentication for the teacher portal ---------------------------
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(o =>
    {
        o.Cookie.Name = "vv_auth";
        o.Cookie.HttpOnly = true;
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
app.UseFileServer();
app.Run();

record EnrollmentRequest(string ParentName, string StudentName, string? StudentClass, string? Subjects, string Phone, string? Message);
record EnrollmentRecord(Guid Id, DateTimeOffset ReceivedAt, string ParentName, string StudentName, string StudentClass, string Subjects, string Phone, string Message);

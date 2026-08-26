using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using TuitionServer.Auth;
using TuitionServer.Data;
using TuitionServer.Services;

namespace TuitionServer.Endpoints;

public static class ParentEndpoints
{
    static string ParentEmail(HttpContext http) => (http.User.FindFirstValue(ClaimTypes.Email) ?? "").ToLowerInvariant();

    public static void MapParentApi(this WebApplication app)
    {
        var open = app.MapGroup("/api/parent");

        open.MapPost("login", async (ParentLoginRequest req, HttpContext http, AppDbContext db) =>
        {
            var email = (req.Email ?? "").Trim().ToLowerInvariant();
            var parent = await db.Parents.FirstOrDefaultAsync(p => p.Email.ToLower() == email);
            if (parent is null || !PasswordHasher.Verify(req.Password ?? "", parent.PasswordHash))
                return Results.Json(new { error = "Invalid email or password." }, statusCode: 401);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, parent.Id.ToString()),
                new(ClaimTypes.Email, parent.Email),
                new(ClaimTypes.Role, "Parent"),
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await http.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
            return Results.Ok(new { parent.Email });
        });

        // Sign in a parent with a verified Google account (any email a teacher has
        // linked to a student — no password needed).
        open.MapPost("google", async (GoogleLoginRequest req, HttpContext http, AppDbContext db, IConfiguration cfg) =>
        {
            var email = await GoogleAuth.VerifyEmailAsync(req.Credential, cfg["Google:ClientId"]);
            if (email is null) return Results.Json(new { error = "Google sign-in could not be verified." }, statusCode: 401);
            var has = await db.Students.AnyAsync(s => s.ParentEmail.ToLower() == email);
            if (!has) return Results.Json(new { error = $"No student is linked to {email}. Ask the tuition to add your email." }, statusCode: 403);

            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, email),
                new(ClaimTypes.Role, "Parent"),
            };
            await http.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)));
            return Results.Ok(new { email });
        });

        open.MapPost("logout", async (HttpContext http) =>
        {
            await http.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        }).RequireAuthorization("Parent");

        open.MapGet("me", (HttpContext http) => Results.Ok(new { email = http.User.FindFirstValue(ClaimTypes.Email) }))
            .RequireAuthorization("Parent");

        var api = app.MapGroup("/api/parent").RequireAuthorization("Parent");

        // The parent's children (students whose parent email matches)
        api.MapGet("children", async (HttpContext http, AppDbContext db) =>
        {
            var email = ParentEmail(http);
            var list = await db.Students.Where(s => s.ParentEmail.ToLower() == email).OrderBy(s => s.Name)
                .Select(s => new
                {
                    s.Id, s.Name, s.ClassName,
                    teacher = s.Teacher!.Name,
                    tests = s.Marks.Count,
                    average = s.Marks.Count == 0 ? 0 : Math.Round(s.Marks.Average(m => m.Test!.MaxMarks <= 0 ? 0 : m.Score / m.Test.MaxMarks * 100), 1)
                }).ToListAsync();
            return Results.Ok(list);
        });

        // A child's full report (only if they belong to this parent)
        api.MapGet("children/{id:int}/report", async (int id, HttpContext http, AppDbContext db) =>
        {
            var email = ParentEmail(http);
            var student = await db.Students.Include(s => s.Teacher).Include(s => s.Marks).ThenInclude(m => m.Test)
                .FirstOrDefaultAsync(s => s.Id == id && s.ParentEmail.ToLower() == email);
            if (student is null) return Results.NotFound();
            return Results.Ok(ReportBuilder.Build(student, student.Teacher?.Name ?? ""));
        });
    }
}

public record ParentLoginRequest(string? Email, string? Password);

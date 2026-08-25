using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using TuitionServer.Auth;
using TuitionServer.Data;
using TuitionServer.Models;
using TuitionServer.Services;

namespace TuitionServer.Endpoints;

public static class AdminEndpoints
{
    static int? CurrentTeacherId(HttpContext http) =>
        int.TryParse(http.User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    public static void MapAdminApi(this WebApplication app)
    {
        // ---- Auth ----------------------------------------------------------
        var auth = app.MapGroup("/api/auth");

        auth.MapPost("login", async (LoginRequest req, HttpContext http, AppDbContext db) =>
        {
            var email = (req.Email ?? "").Trim().ToLowerInvariant();
            var teacher = await db.Teachers.FirstOrDefaultAsync(t => t.Email.ToLower() == email);
            if (teacher is null || !PasswordHasher.Verify(req.Password ?? "", teacher.PasswordHash))
                return Results.Json(new { error = "Invalid email or password." }, statusCode: 401);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, teacher.Id.ToString()),
                new(ClaimTypes.Name, teacher.Name),
                new(ClaimTypes.Email, teacher.Email),
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await http.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));
            return Results.Ok(new { teacher.Id, teacher.Name, teacher.Email });
        });

        auth.MapPost("logout", async (HttpContext http) =>
        {
            await http.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        }).RequireAuthorization();

        auth.MapGet("me", (HttpContext http) => Results.Ok(new
        {
            id = CurrentTeacherId(http),
            name = http.User.FindFirstValue(ClaimTypes.Name),
            email = http.User.FindFirstValue(ClaimTypes.Email),
        })).RequireAuthorization();

        // ---- Authenticated API --------------------------------------------
        var api = app.MapGroup("/api").RequireAuthorization();

        // Teachers (any teacher can add another)
        api.MapGet("teachers", async (AppDbContext db) =>
            Results.Ok(await db.Teachers.OrderBy(t => t.Name)
                .Select(t => new { t.Id, t.Name, t.Email, students = t.Students.Count }).ToListAsync()));

        api.MapPost("teachers", async (TeacherRequest req, AppDbContext db) =>
        {
            var email = (req.Email ?? "").Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(req.Name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(req.Password))
                return Results.BadRequest(new { error = "Name, email and password are required." });
            if (await db.Teachers.AnyAsync(t => t.Email.ToLower() == email))
                return Results.BadRequest(new { error = "A teacher with that email already exists." });

            var teacher = new Teacher { Name = req.Name.Trim(), Email = email, PasswordHash = PasswordHasher.Hash(req.Password) };
            db.Teachers.Add(teacher);
            await db.SaveChangesAsync();
            return Results.Ok(new { teacher.Id, teacher.Name, teacher.Email });
        });

        api.MapDelete("teachers/{id:int}", async (int id, HttpContext http, AppDbContext db) =>
        {
            if (id == CurrentTeacherId(http)) return Results.BadRequest(new { error = "You can't delete your own account." });
            if (await db.Teachers.CountAsync() <= 1) return Results.BadRequest(new { error = "At least one teacher must remain." });
            var t = await db.Teachers.FindAsync(id);
            if (t is null) return Results.NotFound();
            db.Teachers.Remove(t);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        // Students (scoped to the signed-in teacher)
        api.MapGet("students", async (HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var list = await db.Students.Where(s => s.TeacherId == tid).OrderBy(s => s.Name)
                .Select(s => new
                {
                    s.Id, s.Name, s.ClassName, s.ParentName, s.ParentEmail, s.ParentPhone, s.Notes,
                    tests = s.Marks.Count,
                    average = s.Marks.Count == 0 ? 0 : Math.Round(s.Marks.Average(m => m.Test!.MaxMarks <= 0 ? 0 : m.Score / m.Test.MaxMarks * 100), 1)
                }).ToListAsync();
            return Results.Ok(list);
        });

        api.MapPost("students", async (StudentRequest req, HttpContext http, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(req.Name)) return Results.BadRequest(new { error = "Student name is required." });
            var s = new Student
            {
                TeacherId = CurrentTeacherId(http)!.Value,
                Name = req.Name.Trim(), ClassName = req.ClassName?.Trim() ?? "",
                ParentName = req.ParentName?.Trim() ?? "", ParentEmail = req.ParentEmail?.Trim() ?? "",
                ParentPhone = req.ParentPhone?.Trim() ?? "", Notes = req.Notes?.Trim() ?? "",
            };
            db.Students.Add(s);
            await db.SaveChangesAsync();
            return Results.Ok(new { s.Id });
        });

        api.MapPut("students/{id:int}", async (int id, StudentRequest req, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == id && x.TeacherId == tid);
            if (s is null) return Results.NotFound();
            s.Name = req.Name?.Trim() ?? s.Name; s.ClassName = req.ClassName?.Trim() ?? s.ClassName;
            s.ParentName = req.ParentName?.Trim() ?? s.ParentName; s.ParentEmail = req.ParentEmail?.Trim() ?? s.ParentEmail;
            s.ParentPhone = req.ParentPhone?.Trim() ?? s.ParentPhone; s.Notes = req.Notes?.Trim() ?? s.Notes;
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        api.MapDelete("students/{id:int}", async (int id, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == id && x.TeacherId == tid);
            if (s is null) return Results.NotFound();
            db.Students.Remove(s);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        // Tests (scoped to teacher)
        api.MapGet("tests", async (HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            return Results.Ok(await db.Tests.Where(t => t.TeacherId == tid).OrderByDescending(t => t.Date)
                .Select(t => new { t.Id, t.Name, t.Subject, t.Date, t.MaxMarks }).ToListAsync());
        });

        api.MapPost("tests", async (TestRequest req, HttpContext http, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(req.Name)) return Results.BadRequest(new { error = "Test name is required." });
            var t = new Test
            {
                TeacherId = CurrentTeacherId(http)!.Value,
                Name = req.Name.Trim(), Subject = req.Subject?.Trim() ?? "",
                Date = req.Date ?? DateOnly.FromDateTime(DateTime.Today),
                MaxMarks = req.MaxMarks <= 0 ? 100 : req.MaxMarks,
            };
            db.Tests.Add(t);
            await db.SaveChangesAsync();
            return Results.Ok(new { t.Id });
        });

        api.MapDelete("tests/{id:int}", async (int id, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var t = await db.Tests.FirstOrDefaultAsync(x => x.Id == id && x.TeacherId == tid);
            if (t is null) return Results.NotFound();
            db.Tests.Remove(t);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        // Marks for a student (mine) — includes every test so blanks can be filled
        api.MapGet("students/{id:int}/marks", async (int id, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var student = await db.Students.FirstOrDefaultAsync(s => s.Id == id && s.TeacherId == tid);
            if (student is null) return Results.NotFound();
            var tests = await db.Tests.Where(t => t.TeacherId == tid).OrderByDescending(t => t.Date).ToListAsync();
            var marks = await db.Marks.Where(m => m.StudentId == id).ToListAsync();
            var rows = tests.Select(t =>
            {
                var m = marks.FirstOrDefault(x => x.TestId == t.Id);
                return new { testId = t.Id, test = t.Name, subject = t.Subject, date = t.Date, maxMarks = t.MaxMarks,
                    score = m?.Score, remark = m?.Remark ?? "" };
            });
            return Results.Ok(rows);
        });

        // Upsert a mark
        api.MapPut("marks", async (MarkRequest req, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var student = await db.Students.FirstOrDefaultAsync(s => s.Id == req.StudentId && s.TeacherId == tid);
            var test = await db.Tests.FirstOrDefaultAsync(t => t.Id == req.TestId && t.TeacherId == tid);
            if (student is null || test is null) return Results.NotFound();

            var mark = await db.Marks.FirstOrDefaultAsync(m => m.StudentId == req.StudentId && m.TestId == req.TestId);
            if (req.Score is null)
            {
                if (mark is not null) db.Marks.Remove(mark); // clearing the box removes the mark
            }
            else if (mark is null)
                db.Marks.Add(new Mark { StudentId = req.StudentId, TestId = req.TestId, Score = req.Score.Value, Remark = req.Remark?.Trim() ?? "" });
            else
            {
                mark.Score = req.Score.Value; mark.Remark = req.Remark?.Trim() ?? "";
            }
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        // Computed report (for charts on the report page)
        api.MapGet("students/{id:int}/report", async (int id, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var student = await db.Students.Include(s => s.Marks).ThenInclude(m => m.Test)
                .FirstOrDefaultAsync(s => s.Id == id && s.TeacherId == tid);
            if (student is null) return Results.NotFound();
            var teacherName = http.User.FindFirstValue(ClaimTypes.Name) ?? "";
            return Results.Ok(ReportBuilder.Build(student, teacherName));
        });

        // Email the report to the parent
        api.MapPost("students/{id:int}/report/email", async (int id, HttpContext http, AppDbContext db, EmailSender email) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var student = await db.Students.Include(s => s.Marks).ThenInclude(m => m.Test)
                .FirstOrDefaultAsync(s => s.Id == id && s.TeacherId == tid);
            if (student is null) return Results.NotFound();
            if (string.IsNullOrWhiteSpace(student.ParentEmail))
                return Results.BadRequest(new { error = "This student has no parent email address." });
            if (!email.IsConfigured)
                return Results.BadRequest(new { error = "Email isn't set up yet. Add the Gmail App Password in the server settings first." });

            var teacherName = http.User.FindFirstValue(ClaimTypes.Name) ?? "";
            var report = ReportBuilder.Build(student, teacherName);
            var html = ReportBuilder.BuildEmailHtml(report);
            try
            {
                await email.SendAsync(student.ParentEmail, student.ParentName,
                    $"{student.Name} — Progress Report · Vidya Vriksh Tuition", html);
                return Results.Ok(new { sent = true, to = student.ParentEmail });
            }
            catch (Exception ex)
            {
                return Results.Json(new { error = "Could not send email: " + ex.Message }, statusCode: 502);
            }
        });

        // Email configuration status (no secrets exposed)
        api.MapGet("settings/email", (EmailSender email, IConfiguration cfg) =>
            Results.Ok(new { configured = email.IsConfigured, sender = cfg["Email:Sender"] ?? "" }));
    }
}

// ---- Request DTOs ----------------------------------------------------------
public record LoginRequest(string? Email, string? Password);
public record TeacherRequest(string? Name, string? Email, string? Password);
public record StudentRequest(string? Name, string? ClassName, string? ParentName, string? ParentEmail, string? ParentPhone, string? Notes);
public record TestRequest(string? Name, string? Subject, DateOnly? Date, int MaxMarks);
public record MarkRequest(int StudentId, int TestId, double? Score, string? Remark);

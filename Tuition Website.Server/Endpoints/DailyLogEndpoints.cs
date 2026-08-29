using System.Security.Claims;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using TuitionServer.Data;
using TuitionServer.Models;
using TuitionServer.Services;

namespace TuitionServer.Endpoints;

// Attendance times (arrived / left / reached home) + a daily activity note,
// with a per-parent daily report sent by email (auto) and WhatsApp (one-tap).
public static class DailyLogEndpoints
{
    static int? CurrentTeacherId(HttpContext http) =>
        int.TryParse(http.User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;
    static string ParentEmail(HttpContext http) => (http.User.FindFirstValue(ClaimTypes.Email) ?? "").ToLowerInvariant();

    static DateOnly ParseDate(string? s) =>
        DateOnly.TryParseExact(s, "yyyy-MM-dd", out var d) ? d : Ist.Today;

    static DateTime? Combine(DateOnly date, string? hhmm) =>
        !string.IsNullOrWhiteSpace(hhmm) && TimeOnly.TryParse(hhmm, out var t) ? date.ToDateTime(t) : null;

    static string? Hhmm(DateTime? t) => t?.ToString("HH:mm");

    // Shape returned to both portals for one day's log (times as 24h HH:mm; the
    // browser formats them for display).
    static object View(DailyLog? l) => new
    {
        arrived = Hhmm(l?.ArrivedAt),
        left = Hhmm(l?.LeftAt),
        reachedHome = Hhmm(l?.ReachedHomeAt),
        reachedHomeBy = l?.ReachedHomeSource ?? "",
        activity = l?.Activity ?? "",
        homework = l?.Homework ?? "",
    };

    static ITimeLimitedDataProtector Protector(IDataProtectionProvider dp) =>
        dp.CreateProtector("VidyaVriksh.ReachedHome.v1").ToTimeLimitedDataProtector();

    static string MakeToken(IDataProtectionProvider dp, int studentId, DateOnly date) =>
        Protector(dp).Protect($"{studentId}|{date:yyyy-MM-dd}", TimeSpan.FromDays(3));

    static (int studentId, DateOnly date)? ReadToken(IDataProtectionProvider dp, string? token)
    {
        if (string.IsNullOrWhiteSpace(token)) return null;
        try
        {
            var parts = Protector(dp).Unprotect(token).Split('|');
            if (parts.Length == 2 && int.TryParse(parts[0], out var sid)
                && DateOnly.TryParseExact(parts[1], "yyyy-MM-dd", out var d))
                return (sid, d);
        }
        catch { /* tampered or expired */ }
        return null;
    }

    static string ConfirmLink(HttpContext http, IDataProtectionProvider dp, int studentId, DateOnly date) =>
        $"{http.Request.Scheme}://{http.Request.Host}/confirm-home?t={Uri.EscapeDataString(MakeToken(dp, studentId, date))}";

    public static void MapDailyApi(this WebApplication app)
    {
        // ---- Teacher: the "Today" board -----------------------------------
        var t = app.MapGroup("/api/daily").RequireAuthorization("Teacher");

        // All of my students with their log for a given day (default today).
        t.MapGet("", async (string? date, HttpContext http, AppDbContext db) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var d = ParseDate(date);
            var students = await db.Students.Where(s => s.TeacherId == tid).OrderBy(s => s.Name).ToListAsync();
            var logs = await db.DailyLogs.Where(l => l.Date == d && l.Student!.TeacherId == tid).ToListAsync();
            var rows = students.Select(s =>
            {
                var l = logs.FirstOrDefault(x => x.StudentId == s.Id);
                return new
                {
                    s.Id, s.Name, s.ClassName, s.ParentName,
                    hasEmail = !string.IsNullOrWhiteSpace(s.ParentEmail),
                    hasPhone = !string.IsNullOrWhiteSpace(s.ParentPhone),
                    arrived = Hhmm(l?.ArrivedAt), left = Hhmm(l?.LeftAt),
                    reachedHome = Hhmm(l?.ReachedHomeAt), reachedHomeBy = l?.ReachedHomeSource ?? "",
                    activity = l?.Activity ?? "", homework = l?.Homework ?? "",
                    emailed = l?.ReportEmailedAt != null,
                };
            });
            return Results.Ok(new { date = d.ToString("yyyy-MM-dd"), students = rows });
        });

        // Get-or-create the log for one of my students on a date.
        static async Task<DailyLog?> Ensure(AppDbContext db, int tid, int studentId, DateOnly date)
        {
            var owns = await db.Students.AnyAsync(s => s.Id == studentId && s.TeacherId == tid);
            if (!owns) return null;
            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == studentId && l.Date == date);
            if (log is null) { log = new DailyLog { StudentId = studentId, Date = date }; db.DailyLogs.Add(log); }
            return log;
        }

        // One-tap stamp: arrived / left (uses the current IST time-of-day on that date).
        t.MapPost("{studentId:int}/arrive", async (int studentId, DayRef req, HttpContext http, AppDbContext db) =>
        {
            var d = ParseDate(req.Date);
            var log = await Ensure(db, CurrentTeacherId(http)!.Value, studentId, d);
            if (log is null) return Results.NotFound();
            log.ArrivedAt = d.ToDateTime(TimeOnly.FromDateTime(Ist.Now));
            await db.SaveChangesAsync();
            return Results.Ok(View(log));
        });

        t.MapPost("{studentId:int}/leave", async (int studentId, DayRef req, HttpContext http, AppDbContext db) =>
        {
            var d = ParseDate(req.Date);
            var log = await Ensure(db, CurrentTeacherId(http)!.Value, studentId, d);
            if (log is null) return Results.NotFound();
            log.LeftAt = d.ToDateTime(TimeOnly.FromDateTime(Ist.Now));
            await db.SaveChangesAsync();
            return Results.Ok(View(log));
        });

        // Teacher override for reached-home (normally the parent sets this).
        t.MapPost("{studentId:int}/reached-home", async (int studentId, DayRef req, HttpContext http, AppDbContext db) =>
        {
            var d = ParseDate(req.Date);
            var log = await Ensure(db, CurrentTeacherId(http)!.Value, studentId, d);
            if (log is null) return Results.NotFound();
            log.ReachedHomeAt = d.ToDateTime(TimeOnly.FromDateTime(Ist.Now));
            log.ReachedHomeSource = "Teacher";
            await db.SaveChangesAsync();
            return Results.Ok(View(log));
        });

        // Edit the activity / homework / correct any time (times as "HH:mm", blank clears).
        t.MapPut("{studentId:int}", async (int studentId, DailyEditRequest req, HttpContext http, AppDbContext db) =>
        {
            var d = ParseDate(req.Date);
            var log = await Ensure(db, CurrentTeacherId(http)!.Value, studentId, d);
            if (log is null) return Results.NotFound();
            if (req.Activity is not null) log.Activity = req.Activity.Trim();
            if (req.Homework is not null) log.Homework = req.Homework.Trim();
            if (req.Arrived is not null) log.ArrivedAt = Combine(d, req.Arrived);
            if (req.Left is not null) log.LeftAt = Combine(d, req.Left);
            if (req.ReachedHome is not null)
            {
                log.ReachedHomeAt = Combine(d, req.ReachedHome);
                log.ReachedHomeSource = log.ReachedHomeAt is null ? "" : "Teacher";
            }
            await db.SaveChangesAsync();
            return Results.Ok(View(log));
        });

        // "End of day": list every present student's parent with both-language
        // WhatsApp texts ready. Nothing is sent here — the teacher picks the
        // language per parent and then sends WhatsApp / email from the browser.
        t.MapPost("report-list", async (DayRef req, HttpContext http, AppDbContext db, EmailSender email, IDataProtectionProvider dp) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var teacherName = http.User.FindFirstValue(ClaimTypes.Name) ?? "";
            var d = ParseDate(req.Date);

            // "Present today" = has a log row for the date.
            var logs = await db.DailyLogs.Include(l => l.Student)
                .Where(l => l.Date == d && l.Student!.TeacherId == tid).ToListAsync();

            var rows = logs.OrderBy(l => l.Student!.Name).Select(log =>
            {
                var s = log.Student!;
                var link = ConfirmLink(http, dp, s.Id, d);
                return new
                {
                    studentId = s.Id,
                    name = s.Name,
                    hasEmail = !string.IsNullOrWhiteSpace(s.ParentEmail),
                    phone = s.ParentPhone,
                    emailed = log.ReportEmailedAt != null,
                    textEn = ReportBuilder.BuildDailyWaText(s, log, teacherName, link, "en"),
                    textTe = ReportBuilder.BuildDailyWaText(s, log, teacherName, link, "te"),
                };
            }).ToList();

            return Results.Ok(new { date = d.ToString("yyyy-MM-dd"), emailConfigured = email.IsConfigured, students = rows });
        });

        // Email one student's daily report to their parent in the chosen language.
        t.MapPost("{studentId:int}/email", async (int studentId, DailyEmailRequest req, HttpContext http, AppDbContext db, EmailSender email, IDataProtectionProvider dp) =>
        {
            var tid = CurrentTeacherId(http)!.Value;
            var teacherName = http.User.FindFirstValue(ClaimTypes.Name) ?? "";
            var d = ParseDate(req.Date);
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == studentId && x.TeacherId == tid);
            if (s is null) return Results.NotFound();
            if (string.IsNullOrWhiteSpace(s.ParentEmail))
                return Results.BadRequest(new { error = "This student has no parent email address." });
            if (!email.IsConfigured)
                return Results.BadRequest(new { error = "Email isn't connected yet — set it up in Settings first." });

            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == studentId && l.Date == d)
                      ?? new DailyLog { StudentId = studentId, Date = d };
            var link = ConfirmLink(http, dp, s.Id, d);
            var html = ReportBuilder.BuildDailyEmailHtml(s, log, teacherName, link, req.Lang ?? "en");
            try
            {
                await email.SendAsync(s.ParentEmail, s.ParentName,
                    $"{s.Name} — Daily Report · Vidya Vriksh Tuition", html);
                if (log.Id != 0) { log.ReportEmailedAt = DateTimeOffset.UtcNow; await db.SaveChangesAsync(); }
                return Results.Ok(new { sent = true, to = s.ParentEmail });
            }
            catch (Exception ex)
            {
                return Results.Json(new { error = "Could not send email: " + ex.Message }, statusCode: 502);
            }
        });

        // ---- Parent: read today's log + confirm reached-home --------------
        var p = app.MapGroup("/api/parent/children/{id:int}/daily").RequireAuthorization("Parent");

        p.MapGet("", async (int id, string? date, HttpContext http, AppDbContext db) =>
        {
            var pem = ParentEmail(http);
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == id && x.ParentEmail.ToLower() == pem);
            if (s is null) return Results.NotFound();
            var d = ParseDate(date);
            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == id && l.Date == d);
            return Results.Ok(new { date = d.ToString("yyyy-MM-dd"), studentName = s.Name, log = View(log) });
        });

        p.MapPost("reached-home", async (int id, DayRef req, HttpContext http, AppDbContext db) =>
        {
            var pem = ParentEmail(http);
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == id && x.ParentEmail.ToLower() == pem);
            if (s is null) return Results.NotFound();
            var d = ParseDate(req.Date);
            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == id && l.Date == d);
            if (log is null) { log = new DailyLog { StudentId = id, Date = d }; db.DailyLogs.Add(log); }
            if (log.ReachedHomeAt is null)
            {
                log.ReachedHomeAt = d.ToDateTime(TimeOnly.FromDateTime(Ist.Now));
                log.ReachedHomeSource = "Parent";
                await db.SaveChangesAsync();
            }
            return Results.Ok(new { reachedHome = Hhmm(log.ReachedHomeAt) });
        });

        // ---- Public: no-login "reached home" confirm link -----------------
        var c = app.MapGroup("/api/confirm-home");

        c.MapGet("", async (string? t, AppDbContext db, IDataProtectionProvider dp) =>
        {
            var parsed = ReadToken(dp, t);
            if (parsed is null) return Results.Json(new { error = "This link is invalid or has expired." }, statusCode: 400);
            var (sid, d) = parsed.Value;
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == sid);
            if (s is null) return Results.Json(new { error = "Student not found." }, statusCode: 404);
            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == sid && l.Date == d);
            return Results.Ok(new
            {
                childName = s.Name,
                className = s.ClassName,
                date = Ist.DateLong(d),
                alreadyConfirmed = log?.ReachedHomeAt != null,
                time = Hhmm(log?.ReachedHomeAt),
            });
        });

        c.MapPost("", async (ConfirmHomeRequest req, AppDbContext db, IDataProtectionProvider dp) =>
        {
            var parsed = ReadToken(dp, req.T);
            if (parsed is null) return Results.Json(new { error = "This link is invalid or has expired." }, statusCode: 400);
            var (sid, d) = parsed.Value;
            var s = await db.Students.FirstOrDefaultAsync(x => x.Id == sid);
            if (s is null) return Results.Json(new { error = "Student not found." }, statusCode: 404);
            var log = await db.DailyLogs.FirstOrDefaultAsync(l => l.StudentId == sid && l.Date == d);
            if (log is null) { log = new DailyLog { StudentId = sid, Date = d }; db.DailyLogs.Add(log); }
            if (log.ReachedHomeAt is null)
            {
                log.ReachedHomeAt = d.ToDateTime(TimeOnly.FromDateTime(Ist.Now));
                log.ReachedHomeSource = "Parent";
                await db.SaveChangesAsync();
            }
            return Results.Ok(new { time = Hhmm(log.ReachedHomeAt) });
        });
    }
}

public record DayRef(string? Date);
public record DailyEditRequest(string? Date, string? Activity, string? Homework, string? Arrived, string? Left, string? ReachedHome);
public record DailyEmailRequest(string? Date, string? Lang);
public record ConfirmHomeRequest(string? T);

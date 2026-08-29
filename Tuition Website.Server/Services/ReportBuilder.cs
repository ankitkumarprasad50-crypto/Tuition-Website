using System.Text;
using TuitionServer.Models;

namespace TuitionServer.Services;

public record ReportRow(string Test, string Subject, DateOnly Date, double Score, int MaxMarks, double Percent, string Remark);

public record StudentReport(
    int StudentId,
    string StudentName,
    string ClassName,
    string ParentName,
    string ParentEmail,
    string ParentPhone,
    string TeacherName,
    IReadOnlyList<ReportRow> Rows,
    double AveragePercent,
    string Verdict);

public static class ReportBuilder
{
    public static StudentReport Build(Student student, string teacherName)
    {
        var rows = student.Marks
            .Where(m => m.Test != null)
            .OrderBy(m => m.Test!.Date)
            .Select(m =>
            {
                var max = m.Test!.MaxMarks <= 0 ? 100 : m.Test.MaxMarks;
                var pct = Math.Round(m.Score / max * 100, 1);
                return new ReportRow(m.Test.Name, m.Test.Subject, m.Test.Date, m.Score, m.Test.MaxMarks, pct, m.Remark);
            })
            .ToList();

        var avg = rows.Count > 0 ? Math.Round(rows.Average(r => r.Percent), 1) : 0;
        var verdict = Verdict(avg, rows.Count);

        return new StudentReport(student.Id, student.Name, student.ClassName, student.ParentName,
            student.ParentEmail, student.ParentPhone, teacherName, rows, avg, verdict);
    }

    public static string Verdict(double avg, int count)
    {
        if (count == 0) return "No tests recorded yet.";
        if (avg >= 85) return "Excellent — consistently strong performance. 🌟";
        if (avg >= 70) return "Very good — doing well with room to shine further. 👍";
        if (avg >= 50) return "Good progress — steady improvement with regular practice. 📈";
        return "Needs support — extra practice and attention recommended. 🤝";
    }

    // Email-safe HTML (inline styles, table layout, CSS bars) that renders in Gmail.
    public static string BuildEmailHtml(StudentReport r)
    {
        var sb = new StringBuilder();
        sb.Append($@"<div style=""font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#3D342A"">
  <div style=""background:#E07A5F;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0"">
    <div style=""font-size:20px;font-weight:bold"">🌳 Milestone Tuitions</div>
    <div style=""opacity:.9;font-size:13px"">Progress Report</div>
  </div>
  <div style=""border:1px solid #F6D9C6;border-top:none;border-radius:0 0 14px 14px;padding:24px"">
    <p style=""margin:0 0 4px"">Dear {Esc(r.ParentName)},</p>
    <p style=""margin:0 0 16px;color:#7D7264"">Here is the latest progress report for <strong>{Esc(r.StudentName)}</strong> ({Esc(r.ClassName)}).</p>
    <div style=""background:#FBEADF;border-radius:12px;padding:16px;margin-bottom:18px"">
      <div style=""font-size:13px;color:#7D7264"">Overall average</div>
      <div style=""font-size:30px;font-weight:bold;color:#C65B42"">{r.AveragePercent}%</div>
      <div style=""font-size:14px;margin-top:4px"">{Esc(r.Verdict)}</div>
    </div>
    <table style=""width:100%;border-collapse:collapse;font-size:14px"">
      <tr style=""background:#81B29A;color:#fff"">
        <th style=""text-align:left;padding:8px 10px"">Test</th>
        <th style=""text-align:left;padding:8px 10px"">Subject</th>
        <th style=""text-align:right;padding:8px 10px"">Score</th>
        <th style=""text-align:left;padding:8px 10px;width:130px"">Result</th>
      </tr>");
        var i = 0;
        foreach (var row in r.Rows)
        {
            var bg = (i++ % 2 == 0) ? "#FFF8F0" : "#ffffff";
            var barW = Math.Clamp((int)Math.Round(row.Percent), 0, 100);
            sb.Append($@"
      <tr style=""background:{bg}"">
        <td style=""padding:8px 10px"">{Esc(row.Test)}</td>
        <td style=""padding:8px 10px"">{Esc(row.Subject)}</td>
        <td style=""padding:8px 10px;text-align:right"">{row.Score}/{row.MaxMarks}</td>
        <td style=""padding:8px 10px"">
          <div style=""background:#F6D9C6;border-radius:6px;height:12px;width:100%"">
            <div style=""background:#E07A5F;height:12px;border-radius:6px;width:{barW}%""></div>
          </div>
          <div style=""font-size:12px;color:#7D7264;margin-top:2px"">{row.Percent}%</div>
        </td>
      </tr>");
        }
        if (r.Rows.Count == 0)
            sb.Append(@"<tr><td colspan=""4"" style=""padding:12px;color:#7D7264"">No tests recorded yet.</td></tr>");

        sb.Append($@"
    </table>
    <p style=""margin:18px 0 0;color:#7D7264;font-size:14px"">
      With regards,<br><strong>{Esc(r.TeacherName)}</strong><br>Milestone Tuitions, Kovvur
    </p>
  </div>
  <p style=""text-align:center;color:#9a9086;font-size:12px;margin:14px 0"">Sent via Milestone Tuitions · Kovvur</p>
</div>");
        return sb.ToString();
    }

    private static string Esc(string s) => System.Net.WebUtility.HtmlEncode(s ?? "");

    // ---- Daily attendance + activity report (single language per message) ----
    // The teacher chooses the language when sending; each parent gets one clean
    // message in just that language. lang is "te" (Telugu) or anything else (English).

    private static bool IsTe(string? lang) => string.Equals(lang, "te", StringComparison.OrdinalIgnoreCase);

    // Email-safe HTML for one student's day, in the chosen language. confirmLink
    // (optional) lets the parent confirm "reached home" if it isn't recorded yet.
    public static string BuildDailyEmailHtml(Student s, DailyLog log, string teacherName, string? confirmLink, string lang)
    {
        var te = IsTe(lang);
        var L = te
            ? (title: "రోజువారీ నివేదిక", greet: "నమస్తే", parentFallback: "తల్లిదండ్రులకు",
               intro: "ఈ రోజు మీ బిడ్డ ట్యూషన్ నివేదిక ఇదిగో.",
               arrived: "ట్యూషన్‌కి చేరిన సమయం", left: "బయలుదేరిన సమయం", home: "ఇంటికి చేరిన సమయం",
               did: "ఈ రోజు ఏం చేశారు", hw: "ఇంటి పని",
               confirm: "✅ ఇంటికి చేరారని నిర్ధారించండి", confirmSub: "మీ బిడ్డ ఇంటికి చేరాక ఈ బటన్ నొక్కండి",
               regards: "సప్రేమగా,")
            : (title: "Daily Report", greet: "Dear", parentFallback: "Parent",
               intro: "Here is today's tuition report for your child.",
               arrived: "Reached tuition", left: "Left tuition", home: "Reached home",
               did: "What we did today", hw: "Homework",
               confirm: "✅ Confirm reached home", confirmSub: "Tap once your child is home",
               regards: "With regards,");

        string Row(string label, string value) => $@"
      <tr>
        <td style=""padding:8px 10px;color:#7D7264;width:200px"">{Esc(label)}</td>
        <td style=""padding:8px 10px;font-weight:bold"">{Esc(value)}</td>
      </tr>";

        var reachedHome = log.ReachedHomeAt is null ? "—" : Ist.Time(log.ReachedHomeAt);
        var activityBlock = string.IsNullOrWhiteSpace(log.Activity) ? "—" : log.Activity;
        var homeworkBlock = string.IsNullOrWhiteSpace(log.Homework) ? "—" : log.Homework;

        var confirmHtml = (log.ReachedHomeAt is null && !string.IsNullOrWhiteSpace(confirmLink))
            ? $@"<div style=""text-align:center;margin:18px 0 4px"">
                   <a href=""{Esc(confirmLink!)}"" style=""background:#81B29A;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:10px;display:inline-block"">{Esc(L.confirm)}</a>
                   <div style=""font-size:12px;color:#9a9086;margin-top:6px"">{Esc(L.confirmSub)}</div>
                 </div>"
            : "";

        var parentName = string.IsNullOrWhiteSpace(s.ParentName) ? L.parentFallback : s.ParentName;
        var cls = string.IsNullOrWhiteSpace(s.ClassName) ? "" : "(" + Esc(s.ClassName) + ")";

        return $@"<div style=""font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#3D342A"">
  <div style=""background:#E07A5F;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0"">
    <div style=""font-size:20px;font-weight:bold"">🌳 Milestone Tuitions</div>
    <div style=""opacity:.9;font-size:13px"">{Esc(L.title)} — {Esc(Ist.DateLong(log.Date))}</div>
  </div>
  <div style=""border:1px solid #F6D9C6;border-top:none;border-radius:0 0 14px 14px;padding:24px"">
    <p style=""margin:0 0 4px"">{Esc(L.greet)} {Esc(parentName)},</p>
    <p style=""margin:0 0 16px;color:#7D7264""><strong>{Esc(s.Name)}</strong> {cls} — {Esc(L.intro)}</p>
    <table style=""width:100%;border-collapse:collapse;font-size:14px;background:#FBEADF;border-radius:12px;overflow:hidden"">
      {Row(L.arrived, Ist.Time(log.ArrivedAt))}
      {Row(L.left, Ist.Time(log.LeftAt))}
      {Row(L.home, reachedHome)}
      {Row(L.did, activityBlock)}
      {Row(L.hw, homeworkBlock)}
    </table>
    {confirmHtml}
    <p style=""margin:18px 0 0;color:#7D7264;font-size:14px"">
      {Esc(L.regards)}<br><strong>{Esc(teacherName)}</strong><br>Milestone Tuitions, Kovvur
    </p>
  </div>
  <p style=""text-align:center;color:#9a9086;font-size:12px;margin:14px 0"">Sent via Milestone Tuitions · Kovvur</p>
</div>";
    }

    // Plain text for the free WhatsApp "click to send" link, in the chosen language.
    public static string BuildDailyWaText(Student s, DailyLog log, string teacherName, string? confirmLink, string lang)
    {
        var te = IsTe(lang);
        var sb = new StringBuilder();
        if (te)
        {
            sb.Append("🌳 *మైల్‌స్టోన్ ట్యూషన్స్* — రోజువారీ నివేదిక\n");
            sb.Append(Ist.DateLong(log.Date) + "\n\n");
            sb.Append($"👦 {s.Name}" + (string.IsNullOrWhiteSpace(s.ClassName) ? "" : $" ({s.ClassName})") + "\n\n");
            sb.Append($"⏰ ట్యూషన్‌కి చేరారు: {Ist.Time(log.ArrivedAt)}\n");
            sb.Append($"🏃 బయలుదేరారు: {Ist.Time(log.LeftAt)}\n");
            sb.Append($"🏠 ఇంటికి చేరారు: {Ist.Time(log.ReachedHomeAt)}\n");
            if (!string.IsNullOrWhiteSpace(log.Activity)) sb.Append($"\n📚 ఈ రోజు: {log.Activity}\n");
            if (!string.IsNullOrWhiteSpace(log.Homework)) sb.Append($"📝 ఇంటి పని: {log.Homework}\n");
            if (log.ReachedHomeAt is null && !string.IsNullOrWhiteSpace(confirmLink))
                sb.Append($"\n✅ మీ బిడ్డ ఇంటికి చేరాక ఈ లింక్ నొక్కండి:\n{confirmLink}\n");
        }
        else
        {
            sb.Append("🌳 *Milestone Tuitions* — Daily Report\n");
            sb.Append(Ist.DateLong(log.Date) + "\n\n");
            sb.Append($"👦 {s.Name}" + (string.IsNullOrWhiteSpace(s.ClassName) ? "" : $" ({s.ClassName})") + "\n\n");
            sb.Append($"⏰ Reached tuition: {Ist.Time(log.ArrivedAt)}\n");
            sb.Append($"🏃 Left tuition: {Ist.Time(log.LeftAt)}\n");
            sb.Append($"🏠 Reached home: {Ist.Time(log.ReachedHomeAt)}\n");
            if (!string.IsNullOrWhiteSpace(log.Activity)) sb.Append($"\n📚 Today: {log.Activity}\n");
            if (!string.IsNullOrWhiteSpace(log.Homework)) sb.Append($"📝 Homework: {log.Homework}\n");
            if (log.ReachedHomeAt is null && !string.IsNullOrWhiteSpace(confirmLink))
                sb.Append($"\n✅ Tap here once your child is home:\n{confirmLink}\n");
        }
        sb.Append($"\n— {(string.IsNullOrWhiteSpace(teacherName) ? "Milestone Tuitions" : teacherName)}");
        return sb.ToString();
    }
}

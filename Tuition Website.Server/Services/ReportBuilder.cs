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
            student.ParentEmail, teacherName, rows, avg, verdict);
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
    <div style=""font-size:20px;font-weight:bold"">🌳 Vidya Vriksh Tuition</div>
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
      With regards,<br><strong>{Esc(r.TeacherName)}</strong><br>Vidya Vriksh Tuition, Kovvur
    </p>
  </div>
  <p style=""text-align:center;color:#9a9086;font-size:12px;margin:14px 0"">Sent via Vidya Vriksh Tuition · Kovvur</p>
</div>");
        return sb.ToString();
    }

    private static string Esc(string s) => System.Net.WebUtility.HtmlEncode(s ?? "");
}

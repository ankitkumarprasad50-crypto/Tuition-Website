using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using TuitionServer.Data;
using TuitionServer.Models;

namespace TuitionServer.Services;

// Sends email via Gmail SMTP. The active configuration is, in order of priority:
//   1) the EmailConfig row a teacher saved in the portal (App Password encrypted), or
//   2) Email:Sender / Email:AppPassword from configuration (env / user-secrets).
public class EmailSender
{
    private readonly IServiceScopeFactory _scopes;
    private readonly IConfiguration _cfg;
    private readonly ILogger<EmailSender> _log;
    private readonly IDataProtector _protector;

    public EmailSender(IServiceScopeFactory scopes, IDataProtectionProvider dp, IConfiguration cfg, ILogger<EmailSender> log)
    {
        _scopes = scopes;
        _cfg = cfg;
        _log = log;
        _protector = dp.CreateProtector("VidyaVriksh.EmailConfig.v1");
    }

    private record Cfg(string Sender, string Password, string FromName);

    private Cfg? Resolve()
    {
        // 1) Teacher-saved config in the database
        using (var scope = _scopes.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var row = db.EmailConfigs.OrderByDescending(e => e.Id).FirstOrDefault();
            if (row is not null && !string.IsNullOrWhiteSpace(row.Sender) && !string.IsNullOrWhiteSpace(row.ProtectedAppPassword))
            {
                try
                {
                    var pw = _protector.Unprotect(row.ProtectedAppPassword);
                    return new Cfg(row.Sender, pw, string.IsNullOrWhiteSpace(row.FromName) ? "Vidya Vriksh Tuition" : row.FromName);
                }
                catch (Exception ex) { _log.LogWarning(ex, "Could not decrypt saved email password; falling back to config."); }
            }
        }

        // 2) Configuration fallback (env / user-secrets)
        var sender = _cfg["Email:Sender"];
        var appPw = _cfg["Email:AppPassword"]?.Replace(" ", "");
        if (!string.IsNullOrWhiteSpace(sender) && !string.IsNullOrWhiteSpace(appPw))
            return new Cfg(sender, appPw, _cfg["Email:FromName"] ?? "Vidya Vriksh Tuition");

        return null;
    }

    public bool IsConfigured => Resolve() is not null;
    public string? Sender => Resolve()?.Sender;

    public async Task SendAsync(string toEmail, string toName, string subject, string htmlBody)
    {
        var c = Resolve() ?? throw new InvalidOperationException("Email is not configured.");
        await SendCoreAsync(c.Sender, c.Password, c.FromName, toEmail, toName, subject, htmlBody);
    }

    // Verifies the credentials by sending a confirmation email to the sender's own
    // address; only if that succeeds does it save the (encrypted) config.
    public async Task VerifyAndSaveAsync(string sender, string appPassword, string? fromName)
    {
        appPassword = (appPassword ?? "").Replace(" ", "");
        var name = string.IsNullOrWhiteSpace(fromName) ? "Vidya Vriksh Tuition" : fromName!.Trim();

        // Verify by sending a test email to the sender themselves.
        await SendCoreAsync(sender, appPassword, name, sender, name,
            "Vidya Vriksh — email connected ✅",
            "<div style=\"font-family:Arial,sans-serif;color:#3D342A\"><h2>🌳 Email connected!</h2>" +
            "<p>This inbox is now set up to send Vidya Vriksh Tuition emails — parent enquiry alerts and student progress reports will come from here.</p></div>");

        // Save (encrypted) only after a successful send.
        using var scope = _scopes.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var row = await db.EmailConfigs.OrderByDescending(e => e.Id).FirstOrDefaultAsync();
        if (row is null) { row = new EmailConfig(); db.EmailConfigs.Add(row); }
        row.Sender = sender.Trim();
        row.ProtectedAppPassword = _protector.Protect(appPassword);
        row.FromName = name;
        row.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync();
        _log.LogInformation("Email sending configured for {Sender} by portal.", row.Sender);
    }

    private static async Task SendCoreAsync(string sender, string appPassword, string fromName,
        string toEmail, string toName, string subject, string htmlBody)
    {
        if (string.IsNullOrWhiteSpace(sender) || string.IsNullOrWhiteSpace(appPassword))
            throw new InvalidOperationException("Email is not configured.");

        using var msg = new MailMessage
        {
            From = new MailAddress(sender, fromName),
            Subject = subject,
            Body = htmlBody,
            IsBodyHtml = true,
        };
        msg.To.Add(new MailAddress(toEmail, string.IsNullOrWhiteSpace(toName) ? toEmail : toName));

        using var client = new SmtpClient("smtp.gmail.com", 587)
        {
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            Credentials = new NetworkCredential(sender, appPassword),
            Timeout = 20000,
        };
        await client.SendMailAsync(msg);
    }
}

using System.Net;
using System.Net.Mail;

namespace TuitionServer.Services;

// Sends email via Gmail SMTP. Credentials are read from configuration
// (user-secrets / environment), NEVER hard-coded:
//   Email:Sender       = the Gmail address (e.g. ankit.kumar.prasad.50@gmail.com)
//   Email:AppPassword  = a Google App Password (16 chars, no spaces)
//   Email:FromName     = display name (optional)
public class EmailSender
{
    private readonly IConfiguration _cfg;
    private readonly ILogger<EmailSender> _log;

    public EmailSender(IConfiguration cfg, ILogger<EmailSender> log)
    {
        _cfg = cfg;
        _log = log;
    }

    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(_cfg["Email:Sender"]) &&
        !string.IsNullOrWhiteSpace(_cfg["Email:AppPassword"]);

    public async Task SendAsync(string toEmail, string toName, string subject, string htmlBody)
    {
        var sender = _cfg["Email:Sender"];
        var appPassword = _cfg["Email:AppPassword"]?.Replace(" ", "");
        var fromName = _cfg["Email:FromName"] ?? "Vidya Vriksh Tuition";

        if (string.IsNullOrWhiteSpace(sender) || string.IsNullOrWhiteSpace(appPassword))
            throw new InvalidOperationException(
                "Email is not configured. Set Email:Sender and Email:AppPassword (Google App Password) in user-secrets or environment.");

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
        };

        await client.SendMailAsync(msg);
        _log.LogInformation("Sent email to {To} (subject: {Subject})", toEmail, subject);
    }
}

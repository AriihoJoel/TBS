using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using tbs.api.Models;

namespace tbs.api.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> settings, ILogger<EmailService> logger)
        {
            _settings = settings.Value;
            _logger = logger;
            
        }
        public async Task SendQuoteNotficationAsync(Inquiry inquiry)
        {
            var message = new MimeMessage(); //creates email messages
            message.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
            message.To.Add(MailboxAddress.Parse(_settings.AdminEmail));
            message.Subject = $"New Quote Request from {inquiry.FullName}";
            message.Body = new TextPart("html")
            {
                Text = $@"
                <h2>New quote request recieved</h2>
                <p><strong>Name:</strong> {inquiry.FullName}</p>
                <p><strong>Company:</strong> {(string.IsNullOrWhiteSpace(inquiry.CompanyName) ? "Not provided" : inquiry.CompanyName)}
                <p><strong>Phone:</strong> {inquiry.PhoneNumber}</p>
                <p><strong>Email:</strong> {inquiry.EmailAddress}</p>
                <p><strong>Requested Service:</strong> {inquiry.RequestedService}</p>
                <p><strong>Message:</strong> {inquiry.Message}</p>
                <p><strong>Submitted At:</strong> {inquiry.CreatedAt}</p>
                "
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_settings.SmtpHost, _settings.SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_settings.SmtpUsername, _settings.SmtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);

        }
    }
}

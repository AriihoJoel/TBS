using tbs.api.Models;

namespace tbs.api.Services
{
    public interface IEmailService
    {
        Task SendQuoteNotficationAsync(Inquiry inquiry);
    }
}

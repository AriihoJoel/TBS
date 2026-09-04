using Microsoft.AspNetCore.Mvc;
using tbs.api.Data;
using tbs.api.DTO;
using tbs.api.Models;
using tbs.api.Services;

namespace tbs.api.Controllers
{
    [ApiController]
    [Route("api/inquiries")]
    public class InquiryController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<InquiryController> _logger;
        private readonly IRecaptchaService _recaptchaService;
        public InquiryController(AppDbContext context, IEmailService emailService, ILogger<InquiryController> logger, IRecaptchaService recaptchaService)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
            _recaptchaService = recaptchaService;
        }
        [HttpPost]
        public async Task<ActionResult> CreateInquiry(CreateInquiryDTO inquiry)
        {
            var isCaptchaValid = await _recaptchaService.VerifyAsync(inquiry.CaptchaToken);
            if(!isCaptchaValid)
            {
                return BadRequest("Captcha verification failed. Please try again.");
            }
            var newInquiry = new Inquiry
            {
                FullName = inquiry.FullName,
                CompanyName = inquiry.CompanyName,
                PhoneNumber = inquiry.PhoneNumber,
                EmailAddress = inquiry.EmailAddress,
                RequestedService = inquiry.RequestedService,
                Message = inquiry.Message,
                Status = "New",
                CreatedAt = DateTime.Now
            };
            _context.Inquiries.Add(newInquiry);
            await _context.SaveChangesAsync();
            try
            {
                await _emailService.SendQuoteNotficationAsync(newInquiry);
            }
            catch (Exception ex) 
            {
                // Don't fail the customer's request just because the notification email failed
                _logger.LogError(ex, "Failed to send quote request notification email for inquiry {InquiryId}", newInquiry.Id);
            }
            return CreatedAtAction(nameof(CreateInquiry), new { Id = newInquiry.Id }, newInquiry);
        }
    }
}

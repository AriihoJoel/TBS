using Microsoft.AspNetCore.Mvc;
using tbs.api.Data;
using tbs.api.DTO;
using tbs.api.Models;

namespace tbs.api.Controllers
{
    [ApiController]
    [Route("api/inquiries")]
    public class InquiryController : Controller
    {
        private readonly AppDbContext _context;
        public InquiryController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult> CreateInquiry(CreateInquiryDTO inquiry)
        {
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
            return CreatedAtAction(nameof(CreateInquiry), new { Id = newInquiry.Id }, newInquiry);
        }
    }
}

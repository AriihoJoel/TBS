using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tbs.api.Data;
using tbs.api.DTO;

namespace tbs.api.Controllers
{
    [ApiController]
    [Route("api/admin/inquiries")]
    public class AdminInquiriesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminInquiriesController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<AdminInquiryResponse>>> GetInquiries()
        {
            var inquiries = await _context.Inquiries
                .OrderBy(i => i.Id)
                .AsNoTracking()
                .Select(i => new AdminInquiryResponse
                {
                    Id = i.Id,
                    FullName = i.FullName,
                    CompanyName = i.CompanyName,
                    PhoneNumber = i.PhoneNumber,
                    EmailAddress = i.EmailAddress,
                    RequestedService = i.RequestedService,
                    Message = i.Message,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt
                }).ToListAsync();

            return Ok(inquiries);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AdminInquiryResponse>> GetInquiryById(int id)
        {
            var inquiry = await _context.Inquiries.AsNoTracking()
                .Where(i => i.Id == id)
                .Select(i => new AdminInquiryResponse
                {
                    Id = i.Id,
                    FullName = i.FullName,
                    CompanyName = i.CompanyName,
                    PhoneNumber = i.PhoneNumber,
                    EmailAddress = i.EmailAddress,
                    RequestedService = i.RequestedService,
                    Message = i.Message,
                    Status = i.Status,
                    CreatedAt = i.CreatedAt
                }).FirstOrDefaultAsync();

            if (inquiry == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(inquiry);
            }
        }
    }
}

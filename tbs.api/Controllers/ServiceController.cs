using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tbs.api.Data;
using tbs.api.Models;

namespace tbs.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ServiceController( AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            var services = await _context.Services
                .Where(s => s.IsActive)
                .OrderBy(s => s.Id)
                .ToListAsync();

            return Ok(services);
        }
    }
}

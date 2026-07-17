using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using tbs.api.Data;
using tbs.api.DTO;
using tbs.api.Models;

namespace tbs.api.Controllers
{
    [ApiController]
    [Route("api/auth/admin")]
    public class AdminAuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<AdminUser> _passwordHasher;
        public AdminAuthController(IConfiguration configuration, AppDbContext context, IPasswordHasher<AdminUser> passwordHasher)
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AdminLoginResponse>> Login(AdminLoginRequest request)
        {
            var admin = await _context.AdminUsers.FirstOrDefaultAsync(i => i.Username == request.Username && i.IsActive);
            if(admin is null) 
            {
                return Unauthorized("Inavlid username or password.");
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(admin, admin.PasswordHash, request.Password);

            if (passwordResult == PasswordVerificationResult.Failed) 
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = CreateToken(admin, out var expiresAt);
            return Ok(new AdminLoginResponse {
            
                Token = token,
                Username = request.Username,
                Role = admin.Role,
                Expiration = expiresAt
            });

        }

        private string CreateToken(AdminUser admin, out DateTime expiresAt) 
        {
            var jwtKey = _configuration["Jwt:Key"]!;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            expiresAt = DateTime.Now.AddHours(2);

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, admin.Id.ToString()),
                new(ClaimTypes.Name, admin.Username),
                new(ClaimTypes.Role, admin.Role),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiresAt,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}

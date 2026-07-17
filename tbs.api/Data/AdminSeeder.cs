using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using tbs.api.Models;

namespace tbs.api.Data
{
    //using a seeder because the password must come from user-secrets and be hashed at runtime
    public static class AdminSeeder
    {
        public static async Task SeedAsync(WebApplication app) 
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
            var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<AdminUser>>();

            var username = configuration["AdminSeed:Username"];
            var password = configuration["AdminSeed:Password"];

            if(string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password)) 
            {
                return; // No seeding if username or password is not provided
            }

            var existingUser = await context.AdminUsers.FirstOrDefaultAsync(admin => admin.Username == username);

            if(existingUser is not null) 
            {
                return; // No seeding if user already exists
            }

            var newUser = new AdminUser
            {
                Username = username,
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.Now
            };

            newUser.PasswordHash = passwordHasher.HashPassword(newUser, password);

            context.AdminUsers.Add(newUser);
            await context.SaveChangesAsync();

        }
    }
}

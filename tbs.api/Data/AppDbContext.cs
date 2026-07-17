using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using tbs.api.Models;

namespace tbs.api.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Service> Services => Set<Service>();
        public DbSet<Inquiry> Inquiries => Set<Inquiry>();
        public DbSet<AdminUser> AdminUsers => Set<AdminUser>();


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AdminUser>().HasIndex(
                i => i.Username).IsUnique();

            builder.Entity<Service>().HasData(
                new Service{
                Id = 1,
                Name = "Fresh Food Supply",
                Description = "Reliable supply of fresh local foods including fruits, vegetables, matooke, fresh beef, Chicken, and seasonal produce.",
                IconName = "leaf",
                IsActive = true
                },
                new Service
                {
                    Id = 2,
                    Name = "Grocery Supply",
                    Description = "Supply of everyday grocery items for organizations, hospitals, schools, homes, and institutions.",
                    IconName = "shopping-basket",
                    IsActive = true


                },
                new Service {
                    Id = 3,
                    Name = "Bulk Institutional Supply",
                    Description = "Large-volume food and grocery supply for institutions such as schools, hospitals, hotels and restaurants.",
                    IconName = "building",
                    IsActive = true
                },
                new Service
                {
                    Id = 4,
                    Name = "Delivery Services",
                    Description = "Timely delivery of food and groceries to client locations around Kampala and surrounding areas.",
                    IconName = "truck",
                    IsActive = true
                },
                new Service 
                {
                    Id = 5,
                    Name = "Custom Food Orders",
                    Description = "Flexible sourcing and delivery for specific client needs, including weekly, monthly, and event-based orders.",
                    IconName = "clipboard-list",
                    IsActive = true
                },
                new Service 
                {
                    Id = 6,
                    Name = "Quality Sourcing",
                    Description = "Careful selection of fresh, clean, and dependable food products from trusted local suppliers and markets.",
                    IconName = "badge-check",
                    IsActive = true
                }
            );
           
        }
    }
}

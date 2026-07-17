using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace tbs.api.Migrations
{
    /// <inheritdoc />
    public partial class AddServicesandInquiries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Inquiries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FullName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CompanyName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    EmailAddress = table.Column<string>(type: "text", nullable: false),
                    RequestedService = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inquiries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IconName = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Description", "IconName", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, "Reliable supply of fresh local foods including fruits, vegetables, matooke, fresh beef, Chicken, and seasonal produce.", "leaf", true, "Fresh Food Supply" },
                    { 2, "Supply of everyday grocery items for organizations, hospitals, schools, homes, and institutions.", "shopping-basket", true, "Grocery Supply" },
                    { 3, "Large-volume food and grocery supply for institutions such as schools, hospitals, hotels and restaurants.", "building", true, "Bulk Institutional Supply" },
                    { 4, "Timely delivery of food and groceries to client locations around Kampala and surrounding areas.", "truck", true, "Delivery Services" },
                    { 5, "Flexible sourcing and delivery for specific client needs, including weekly, monthly, and event-based orders.", "clipboard-list", true, "Custom Food Orders" },
                    { 6, "Careful selection of fresh, clean, and dependable food products from trusted local suppliers and markets.", "badge-check", true, "Quality Sourcing" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inquiries");

            migrationBuilder.DropTable(
                name: "Services");
        }
    }
}

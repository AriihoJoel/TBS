using System.ComponentModel.DataAnnotations;

namespace tbs.api.DTO
{
    public class CreateInquiryDTO
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;
        [MaxLength(150)]
        public string CompanyName { get; set; } = string.Empty;
        [Required]
        [MaxLength(30)]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string RequestedService { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;


    }
}

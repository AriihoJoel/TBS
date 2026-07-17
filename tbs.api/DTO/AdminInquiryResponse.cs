namespace tbs.api.DTO
{
    public class AdminInquiryResponse
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string RequestedService { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "";
        public DateTime CreatedAt;
    }
}

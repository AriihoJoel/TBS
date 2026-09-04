namespace tbs.api.Services
{
    public interface IRecaptchaService
    {
        Task<bool> VerifyAsync(string token);
    }
}

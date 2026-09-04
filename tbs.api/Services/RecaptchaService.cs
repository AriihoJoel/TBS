
using Org.BouncyCastle.Security;
using System.Text.Json.Serialization;
using System.Net.Http.Json;

namespace tbs.api.Services
{
    public class RecaptchaService : IRecaptchaService
    {
        private readonly HttpClient _httpClient;//making http requets to the Google API
        private readonly IConfiguration _configuration;//request secret key from configuration(user-secrets)
        private readonly ILogger<RecaptchaService> _logger;//structured logging.

        public RecaptchaService(HttpClient httpClient, IConfiguration configuration, ILogger<RecaptchaService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }
        public async Task<bool> VerifyAsync(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return false;
            }

            var secretKey = _configuration["Recaptcha:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException(
                    "Recaptcha secret key is not configured. Set Recaptcha:SecretKey using user-secrets.");
            }

            var parameters = new Dictionary<string, string>//Build parameters
            {
                ["secret"] = secretKey,
                ["response"] = token
            };

            var response = await _httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", new FormUrlEncodedContent(parameters));//sends post request to Google's verification endpoint with the secret key and token.

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning("reCAPTCHA verification request failed with status code {StatusCode}.", response.StatusCode);
                return false;
            }

            var result = await response.Content.ReadFromJsonAsync<RecaptchaVerifyResponse>();//Deserialize the response into a RecaptchaVerifyResponse object.
            return result?.Success ?? false;
        }

            private class RecaptchaVerifyResponse
        {
            [JsonPropertyName("success")]
            public bool Success { get; set; }

            [JsonPropertyName("error-codes")]
            public List<string>? ErrorCodes { get; set; }
        }
    }
}

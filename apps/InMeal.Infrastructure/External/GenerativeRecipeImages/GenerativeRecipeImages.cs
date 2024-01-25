using System.Net.Http.Json;
using Configuration;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.External.GenerativeRecipeImages;

public class GenerativeRecipeImages : IGenerativeRecipeImages
{
    private readonly GenerativeRecipeImagesMicroserviceConfig _config;
    private readonly HttpClient _serviceClient;
    private readonly ILogger<GenerativeRecipeImages> _logger;

    private record GeneratedImageResponse(string Url, string Name);

    public GenerativeRecipeImages(GenerativeRecipeImagesMicroserviceConfig config, HttpClient serviceClient, ILogger<GenerativeRecipeImages> logger)
    {
        _config = config;
        _serviceClient = serviceClient;
        _logger = logger;
    }

    public async Task<GeneratedImage> GetRandomImage()
    {
        try {
            var result = await _serviceClient.GetFromJsonAsync<GeneratedImageResponse>("images")
                         ?? throw new GenerativeRecipeImageException("failed to generate an image");

            return new($"{_config.ProxyPath}/{result.Url}", result.Name);
        } catch (TaskCanceledException ex) {
            _logger.LogWarning(
                ex,
                "Failed to reach the microservice within the configured timeout ('{TimeoutSetting}s') - the service may be down",
                _config.Timeout
            );
        }

        return new(string.Empty, "No result");
    }

    public async Task<bool> TestPing()
    {
        try {
            var response = await _serviceClient.GetStringAsync("ping");
            return response == "pong";
        } catch (Exception) {
            return false;
        }
    }
}
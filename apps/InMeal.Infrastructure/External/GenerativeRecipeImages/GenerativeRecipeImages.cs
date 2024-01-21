using System.Net.Http.Json;
using Configuration;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;

namespace InMeal.Infrastructure.External.GenerativeRecipeImages;

public class GenerativeRecipeImages : IGenerativeRecipeImages
{
    private readonly GenerativeRecipeImagesMicroserviceConfig _config;
    private readonly HttpClient _microserviceClient;
    
    private record GeneratedImageResponse(string Url, string Name);

    public GenerativeRecipeImages(GenerativeRecipeImagesMicroserviceConfig config)
    {
        _config = config;
        // TODO: swap to DI registered factory. This is fine for quick testing though
        // https://learn.microsoft.com/en-us/dotnet/core/extensions/httpclient-factory
        _microserviceClient = new HttpClient();
        _microserviceClient.BaseAddress = new Uri(config.serviceUrl);
    }

    public async Task<GeneratedImage> GetRandomImage()
    {
        var result = await _microserviceClient.GetFromJsonAsync<GeneratedImageResponse>("images")
               ?? throw new GenerativeRecipeImageException("failed to generate an image");

        return new($"{_config.serviceUrl}{result.Url}", result.Name);
    }

    public async Task<bool> TestPing()
    {
        try {
            var response = await _microserviceClient.GetStringAsync("ping");
            return response == "pong";
        } catch (Exception) {
            return false;
        }
    }
}
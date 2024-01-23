using System.Net.Http.Json;
using Configuration;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;

namespace InMeal.Infrastructure.External.GenerativeRecipeImages;

public class GenerativeRecipeImages : IGenerativeRecipeImages
{
    private readonly GenerativeRecipeImagesMicroserviceConfig _config;
    private readonly HttpClient _serviceClient;

    private record GeneratedImageResponse(string Url, string Name);

    public GenerativeRecipeImages(GenerativeRecipeImagesMicroserviceConfig config, HttpClient serviceClient)
    {
        _config = config;
        _serviceClient = serviceClient;
    }

    public async Task<GeneratedImage> GetRandomImage()
    {
        var result = await _serviceClient.GetFromJsonAsync<GeneratedImageResponse>("images")
               ?? throw new GenerativeRecipeImageException("failed to generate an image");

        return new($"{_config.ServiceUrl}{result.Url}", result.Name);
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
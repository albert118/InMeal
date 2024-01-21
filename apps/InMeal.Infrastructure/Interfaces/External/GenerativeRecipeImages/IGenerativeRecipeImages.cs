namespace InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;

public interface IGenerativeRecipeImages
{
    /// <summary>
    /// Get a random demo image
    /// </summary>
    Task<GeneratedImage> GetRandomImage();

    /// <summary>
    /// Expect a "pong" response
    /// </summary>
    /// <returns>true if ponged</returns>
    Task<bool> TestPing();
}

/// <summary>
/// A generated image
/// </summary>
/// <param name="Url">available at this location (base address is configured within settings) </param>
/// <param name="Name"></param>
public record GeneratedImage(string Url, string Name);

public class GenerativeRecipeImageException : Exception
{
    public GenerativeRecipeImageException() { }

    public GenerativeRecipeImageException(string message) : base(message) { }

    public GenerativeRecipeImageException(string message, Exception inner) : base(message, inner) { }
}
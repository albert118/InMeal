namespace InMeal.Api.Features.Recipes;

public class RecipeUniqueTitleException : ApplicationException
{
    public RecipeUniqueTitleException(string message) : base(message) { }
}
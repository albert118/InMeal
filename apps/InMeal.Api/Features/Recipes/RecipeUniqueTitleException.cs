namespace InMeal.Api.Features.Recipes;

// TODO: simplify and remove this
public class RecipeUniqueTitleException : ApplicationException
{
    public RecipeUniqueTitleException(string message) : base(message) { }
}
namespace InMeal.Api.Features.Ingredients;

// TOOD: simplify and remove this
public class IngredientDeletionException : ApplicationException
{
    public IngredientDeletionException(string message) : base(message) { }
}
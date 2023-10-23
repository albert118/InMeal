namespace InMeal.Features.Ingredients;

public class IngredientDeletionException : ApplicationException
{
    public IngredientDeletionException(string message) : base(message) { }
}
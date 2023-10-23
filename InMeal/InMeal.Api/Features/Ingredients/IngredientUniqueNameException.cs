namespace InMeal.Features.Ingredients;

public class IngredientUniqueNameException : ApplicationException
{
    public IngredientUniqueNameException(string message) : base(message) { }
}
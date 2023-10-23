namespace InMeal.Api.Features.Ingredients;

public class IngredientUniqueNameException : ApplicationException
{
    public IngredientUniqueNameException(string message) : base(message) { }
}
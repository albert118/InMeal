namespace InMeal.Api.Features.Ingredients;

// TODO: simplify and remove this
public class IngredientUniqueNameException : ApplicationException
{
    public IngredientUniqueNameException(string message) : base(message) { }
}
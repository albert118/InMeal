namespace InMeal.Core.Entities;

public class RecipePhoto
{
    public Guid Id { get; set; }

    public string FileName { get; set; }

    // I think???
    public object PhotoBinary { get; set; }
}

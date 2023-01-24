namespace InMeal.Core.Entities;

public class RecipePhoto
{
    public Guid Id { get; set; }

    public Guid RecipeId { get; set; }

    public Recipe Recipe { get; set; }

    // includes file extension, case sensitive
    public string FileName { get; set; }

    public byte[] Bytes { get; set; }
}

namespace InMeal.Core.Mementos;

public sealed class RecipePhotoMemento
{
    public RecipePhotoMemento(Guid recipeId, string fileName, byte[] bytes)
    {
        Id = Guid.NewGuid();
        RecipeId = recipeId;
        FileName = fileName;
        Bytes = bytes;
    }

    public Guid Id { get; set; }

    public Guid RecipeId { get; set; }

    public RecipeMemento Recipe { get; set; }

    // includes file extension, case sensitive
    public string FileName { get; set; }

    public byte[] Bytes { get; set; }
}
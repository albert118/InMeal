namespace InMeal.Core.Entities;

public class RecipePhoto
{
    public RecipePhoto(string fn, byte[] photo)
    {
        FileName = fn;
        Bytes = photo;
    }

    public Guid Id { get; set; }

    // includes file extension, case sensitive
    public string FileName { get; set; }

    public byte[] Bytes { get; set; }
}
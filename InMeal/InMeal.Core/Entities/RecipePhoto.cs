using InMeal.Core.Kernel;

namespace InMeal.Core.Entities;

public class RecipePhoto
{
    public RecipePhotoId Id { get; set; }

    public RecipeId RecipeId { get; set; }

    public Recipe Recipe { get; set; }

    // includes file extension, case sensitive
    public string FileName { get; set; }

    public byte[] Bytes { get; set; }
}

public class RecipePhotoId : Identity<Guid>
{
    public RecipePhotoId(Guid id) : base(id) { }
}
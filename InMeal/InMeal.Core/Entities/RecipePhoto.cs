using InMeal.Core.Kernel;
using InMeal.Core.Mementos;

namespace InMeal.Core.Entities;

public class RecipePhoto : IHaveState<RecipePhotoMemento>
{
    public RecipePhoto(RecipeId recipeId, string fileName, byte[] bytes)
    {
        Id = new RecipePhotoId(Guid.NewGuid());
        
        RecipeId = recipeId;
        
        FileName = fileName;
        Bytes = bytes;
    }

    public RecipePhotoId Id { get; set; }

    public RecipeId RecipeId { get; set; }

    public string FileName { get; set; }

    public byte[] Bytes { get; set; }

    public RecipePhotoMemento State => new(this);
}

public class RecipePhotoId : Identity<Guid>
{
    public RecipePhotoId(Guid id) : base(id) { }
}
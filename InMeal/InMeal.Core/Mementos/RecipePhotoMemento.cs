using InMeal.Core.Entities;
using InMeal.Core.Kernel;

namespace InMeal.Core.Mementos;

public sealed class RecipePhotoMemento : EntityMemento
{
    public RecipePhotoMemento(RecipePhoto recipePhoto)
    {
        Id = recipePhoto.Id.Key;
        
        RecipeId = recipePhoto.RecipeId.Key;
        Recipe = null;

        FileName = recipePhoto.FileName;
        Bytes = recipePhoto.Bytes;
    }

    public Guid Id { get; private set; }

    public Guid RecipeId { get; private set; }

    public RecipeMemento? Recipe { get; private set; }

    // includes file extension, case sensitive
    public string FileName { get; private set; }

    public byte[] Bytes { get; private set; }
}
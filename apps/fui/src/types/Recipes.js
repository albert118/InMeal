import { stringifyType, isFalsishOrEmpty } from '../utils';

function mapToEditedRecipeDto(editedRecipe) {
    return {
        Id: editedRecipe.id,
        Title: editedRecipe.title,
        Blurb: editedRecipe.blurb,
        PreparationSteps: editedRecipe.preparationSteps,
        CookTime: isFalsishOrEmpty(editedRecipe.cookTime)
            ? 0
            : editedRecipe.cookTime,
        PrepTime: isFalsishOrEmpty(editedRecipe.prepTime)
            ? 0
            : editedRecipe.prepTime,
        Servings: isFalsishOrEmpty(editedRecipe.servings)
            ? 0
            : editedRecipe.servings,
        RecipeIngredients: editedRecipe.recipeIngredients,
        Category: editedRecipe.category.original,
        Course: editedRecipe.course.original,
        Type: editedRecipe.type.original
    };
}

function mapToEditableRecipe(recipe) {
    return {
        id: recipe.id,
        title: recipe.title,
        blurb: recipe.blurb,
        preparationSteps: recipe.preparationSteps,
        cookTime: recipe.cookTime,
        prepTime: recipe.prepTime,
        servings: recipe.servings,
        recipeIngredients: recipe.recipeIngredients,
        category: {
            label: stringifyType(recipe.category),
            original: recipe.category
        },
        course: {
            label: stringifyType(recipe.course),
            original: recipe.course
        },
        image: recipe.image,
        type: { label: stringifyType(recipe.type), original: recipe.type }
    };
}

export { mapToEditedRecipeDto, mapToEditableRecipe };

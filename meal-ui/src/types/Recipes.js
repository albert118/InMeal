import { stringifyType } from 'utils';

function mapToEditedRecipeDto(editedRecipe) {
	var x = {
		Id: editedRecipe.id,
		Title: editedRecipe.title,
		Blurb: editedRecipe.blurb,
		PreparationSteps: editedRecipe.preparationSteps,
		CookTime: editedRecipe.cookTime,
		PrepTime: editedRecipe.prepTime,
		RecipeIngredients: editedRecipe.recipeIngredients,
		Category: editedRecipe.category.original,
		Course: editedRecipe.course.original,
		Type: editedRecipe.type.original
	};
	return x;
}

function mapToEditableRecipe(recipe) {
	return {
		id: recipe.id,
		title: recipe.title,
		blurb: recipe.blurb,
		preparationSteps: recipe.preparationSteps,
		cookTime: recipe.cookTime,
		prepTime: recipe.prepTime,
		recipeIngredients: recipe.recipeIngredients,
		category: { label: stringifyType(recipe.category), original: recipe.category },
		course: { label: stringifyType(recipe.course), original: recipe.course },
		type: { label: stringifyType(recipe.type), original: recipe.type }
	};
}

export { mapToEditedRecipeDto, mapToEditableRecipe };

import { putIngredient } from 'dataHooks/useRecipe';

export default function useRecipeIngredients() {
	const handleAddingAsync = async (additionalIngredient, recipe) => {
		// persist to the data layer
		const persistedIngredient = await putIngredient(additionalIngredient);

		// TODO: quantity logic
		const fakeQuantity = 1;
		const recipeIngredient = createRecipeIngredient(
			recipeIngredient,
			persistedIngredient.id,
			fakeQuantity
		);

		// add the new recipe ingredient to the existing recipe ingredients
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		recipeIngredientsCopy[persistedIngredient.id] = additionalIngredient;

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleRemoving = (removingRecipeIngredientId, recipe) => {
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		delete recipeIngredientsCopy[removingRecipeIngredientId];

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleUpdating = (updatingId, updatedValue, recipe) => {
		return {
			// take the existing recipe ingredients
			...recipe.recipeIngredients,
			// but update the given object with the new data
			[updatingId]: {
				// we only care to update the label at this point
				// in the future this may grow to further fields
				...[recipe.recipeIngredients[updatingId]],
				label: updatedValue
			}
		};
	};

	return { handleAddingAsync, handleRemoving, handleUpdating };
}

function createRecipeIngredient(name, id, numberOf) {
	return {
		label: name,
		ingredientId: id,
		quantity: {
			amount: numberOf,
			units: 0
		}
	};
}

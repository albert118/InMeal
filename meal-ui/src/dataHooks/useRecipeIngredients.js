import { useIngredients } from 'dataHooks';

export default function useRecipeIngredients() {
	const { putIngredients } = useIngredients();

	const handleAddingAsync = async (
		additionalIngredientOrIngedients,
		recipe
	) => {
		if (
			!additionalIngredientOrIngedients ||
			additionalIngredientOrIngedients.length === 0
		)
			console.warn(
				'attempting to handle adding recipe ingredients that are undefined or empty is probably unintented'
			);

		return Array.isArray(additionalIngredientOrIngedients)
			? await handleAddingManyAsync(
					additionalIngredientOrIngedients,
					recipe
			  )
			: await handleAddingManyAsync(
					[additionalIngredientOrIngedients],
					recipe
			  );
	};

	const handleAddingManyAsync = async (additionalIngredients, recipe) => {
		// persist to the data layer
		const persistedIngredients = await putIngredients(
			additionalIngredients
		);

		// TODO: quantity logic
		const fakeQuantity = 1;
		const recipeIngredients = additionalIngredients.map(
			(additionalIngredient, idx) =>
				createRecipeIngredient(
					additionalIngredient.label,
					persistedIngredients[idx].id,
					fakeQuantity
				)
		);

		// add the new recipe ingredients to the existing recipe ingredients
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };

		recipeIngredients.forEach(recipeIngredient => {
			recipeIngredientsCopy[recipeIngredient.ingredientId] =
				recipeIngredient;
		});

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

	return {
		handleAddingAsync,
		handleRemoving,
		handleUpdating
	};
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

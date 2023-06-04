import { useIngredients } from 'dataHooks';
import { isFalsishOrEmpty } from 'utils';

export default function useRecipeIngredients() {
	const { putIngredients } = useIngredients();

	const handleRecipeIngredients = async (event, recipe) => {
		const strategies = {
			'new-item': handleAddingAsync,
			'existing-items': handleAddingExisting,
			'remove-item': handleRemoving,
			'update-item': handleUpdating
		};

		const strategyName = isFalsishOrEmpty(event.target.value)
			? 'remove-item'
			: event.target.id;

		console.log(strategyName);

		const strategy = strategies[strategyName] ?? strategies['update-item'];

		return await strategy(event.target.value, recipe);
	};

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
			additionalIngredients.map(
				additionalIngredient => additionalIngredient.label
			)
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

		recipeIngredients.forEach(ri => {
			recipeIngredientsCopy[ri.ingredientId] = ri;
		});

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleAddingExisting = (additionalIngredients, recipe) => {
		// TODO: quantity logic
		const fakeQuantity = 1;
		const recipeIngredients = additionalIngredients.map(
			additionalIngredient =>
				createRecipeIngredient(
					additionalIngredient.label,
					additionalIngredient.id,
					fakeQuantity
				)
		);

		// add the new recipe ingredients to the existing recipe ingredients
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };

		recipeIngredients.forEach(ri => {
			recipeIngredientsCopy[ri.ingredientId] = ri;
		});

		console.log(recipeIngredientsCopy);

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleRemoving = (removingRecipeIngredient, recipe) => {
		console.log(`handle removing for: ${removingRecipeIngredient}`);

		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		delete recipeIngredientsCopy[removingRecipeIngredient.ingrdientId];

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

	return { handleRecipeIngredients };
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

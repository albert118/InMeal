import { useIngredients } from 'hooks';
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

		console.info(
			`editing recipe ingredient data with '${strategyName}' strategy`
		);

		const strategy = strategies[strategyName] ?? strategies['update-item'];

		return await strategy(event, recipe);
	};

	const handleAddingAsync = async (event, recipe) => {
		const additionalIngredientOrIngedients = event.target.value;

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

	const handleAddingExisting = (event, recipe) => {
		const additionalIngredients = event.target.value;

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

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleRemoving = (event, recipe) => {
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		delete recipeIngredientsCopy[event.target.id];

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	};

	const handleUpdating = (event, recipe) => {
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		recipeIngredientsCopy[event.target.id] = {
			// we only care to update the label at this point
			// in the future this may grow to further fields
			...[recipeIngredientsCopy[event.target.id]],
			label: event.target.value
		};

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
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

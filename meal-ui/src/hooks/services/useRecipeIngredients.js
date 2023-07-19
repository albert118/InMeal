import { multiSelectEvents } from 'forms/Inputs';

export default function useRecipeIngredients() {
	const strategies = Object.freeze({
		[multiSelectEvents.Add]: executeExisting,
		[multiSelectEvents.Remove]: executeRemoval
	});

	function handleRecipeIngredients(event, recipe) {
		const strategyName = event.target.id;
		console.info(`editing recipe ingredient data with '${strategyName}' strategy`);
		return strategies[strategyName](event, recipe);
	}

	function executeExisting(event, recipe) {
		const { data } = event.target.value;
		const newIngredients = Array.isArray(data) ? data : [data];

		return {
			...recipe,
			recipeIngredients: updateLocalIngredientsWithIds(newIngredients, recipe)
		};
	}

	function executeRemoval(event, recipe) {
		// compare either, as the recipe ingredient may not yet have an ID (because it's new)
		const { id, data: label } = event.target.value;

		return {
			...recipe,
			recipeIngredients: recipe.recipeIngredients.filter(ri =>
				id ? ri['id'] !== id : ri['label'] !== label
			)
		};
	}

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

function updateLocalIngredientsWithIds(newIngredients, recipe, apiData) {
	// TODO: quantity logic
	const fakeQuantity = 1;
	const recipeIngredients = newIngredients.map((newItem, idx) =>
		createRecipeIngredient(newItem.label, apiData ? apiData[idx].id : newItem.id, fakeQuantity)
	);

	// add the new recipe ingredients to the existing recipe ingredients
	let recipeIngredientsCopy = recipe.recipeIngredients ? [...recipe.recipeIngredients] : [];
	const existingIngredientLabels = recipeIngredientsCopy.map(e => e['label']);

	recipeIngredients
		.filter(ri => !existingIngredientLabels.includes(ri['label']))
		.forEach(ri => recipeIngredientsCopy.push(ri));

	return recipeIngredientsCopy;
}

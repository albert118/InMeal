import { multiSelectEvents } from 'components';
import { createRecipeIngredient } from 'types/Ingredients';

export default function useRecipeIngredients() {
	const strategies = Object.freeze({
		[multiSelectEvents.Add]: executeExisting,
		[multiSelectEvents.Remove]: executeRemoval,
		[multiSelectEvents.Update]: executeUpdate
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

	function executeUpdate(event, recipe) {
		// the form uses the label as an ID in this event
		const { id, data: quantity } = event.target.value;
		const recipeIngredientsCopy = [...recipe.recipeIngredients];

		// perform the update
		recipeIngredientsCopy.find(ri => ri['label'] === id).quantity = quantity;

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
		};
	}

	return { handleRecipeIngredients };
}

function updateLocalIngredientsWithIds(newIngredients, recipe, apiData) {
	const recipeIngredients = newIngredients.map((newItem, idx) =>
		createRecipeIngredient(newItem.label, apiData ? apiData[idx].id : newItem.id, newItem?.units)
	);

	// add the new recipe ingredients to the existing recipe ingredients
	let recipeIngredientsCopy = recipe.recipeIngredients ? [...recipe.recipeIngredients] : [];
	const existingIngredientLabels = recipeIngredientsCopy.map(e => e['label']);

	recipeIngredients
		.filter(ri => !existingIngredientLabels.includes(ri['label']))
		.forEach(ri => recipeIngredientsCopy.push(ri));

	return recipeIngredientsCopy;
}

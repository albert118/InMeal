import { useIngredients } from 'hooks/data';
import { multiSelectEvents } from 'forms/Inputs';

export default function useRecipeIngredients() {
	const { putIngredients } = useIngredients();

	const strategies = Object.freeze({
		[multiSelectEvents.New]: executeNew,
		[multiSelectEvents.Existing]: executeExisting,
		[multiSelectEvents.Remove]: executeRemoval,
		[multiSelectEvents.Update]: executeUpdate
	});

	function handleRecipeIngredients(event, recipe) {
		const strategyName = event.target.id;
		console.info(`editing recipe ingredient data with '${strategyName}' strategy`);
		return strategies[strategyName](event, recipe);
	}

	function updateLocalIngredientsWithIds(newIngredients, recipe, apiData) {
		// TODO: quantity logic
		const fakeQuantity = 1;
		const recipeIngredients = newIngredients.map((newItem, idx) =>
			createRecipeIngredient(newItem.label, apiData ? apiData[idx].id : newItem.id, fakeQuantity)
		);

		// add the new recipe ingredients to the existing recipe ingredients
		let recipeIngredientsCopy = [...recipe.recipeIngredients];
		const existingIngredientLabels = recipeIngredientsCopy.map(e => e['label']);

		recipeIngredients
			.filter(ri => !existingIngredientLabels.includes(ri['label']))
			.forEach(ri => recipeIngredientsCopy.push(ri));

		return recipeIngredientsCopy;
	}

	function executeNew(event, recipe) {
		const { data } = event.target.value;
		const newIngredients = Array.isArray(data) ? data : [data];

		if (newIngredients?.length === 0)
			console.warn('attempting to add ingredients without data is probably unintended');

		// TODO
		return putIngredients(newIngredients.map(i => i.label)).then(apiData => {
			return {
				...recipe,
				recipeIngredients: updateLocalIngredientsWithIds(newIngredients, recipe, apiData)
			};
		});
	}
	r;
	function executeExisting(event, recipe) {
		const { data } = event.target.value;
		const newIngredients = Array.isArray(data) ? data : [data];

		return {
			...recipe,
			recipeIngredients: updateLocalIngedientsWithIds(newIngredients, recipe)
		};
	}

	function executeRemoval(event, recipe) {
		return {
			...recipe,
			recipeIngredients: recipe.recipeIngredients.filter(ri => ri['id'] !== event.target.id)
		};
	}

	function executeUpdate(event, recipe) {
		const recipeIngredientsCopy = [...recipe.recipeIngredients];

		let elemToUpdate = recipeIngredientsCopy.find(e => e['id'] === event.target.id);
		elemToUpdate['label'] = event.target.value;

		return {
			...recipe,
			recipeIngredients: recipeIngredientsCopy
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

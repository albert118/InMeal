import { useState, useEffect } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { putIngredient } from 'dataHooks/useRecipe';

export default function useRecipeIngredients() {
	const [ingredientOptions, setIngredientOptions] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const fetchIngredientOptions = async () => {
			setLoading(true);

			// TODO: add an API
			// const response = await fetch(
			// 	`${ApiConfig.API_URL}/ingredients/options`,
			// 	{
			// 		...defaultRequestOptions
			// 	}
			// );

			// if (response.ok) {
			// 	setIngredientOptions(await response.json());
			// } else {
			// 	setErrors(response.errors);
			// }

			setIngredientOptions([
				{
					id: '123456-12345-234567',
					label: 'a test ingredient option'
				}
			]);

			setLoading(false);
		};

		fetchIngredientOptions();
	}, []);

	const handleAddingAsync = async (additionalIngredient, recipe) => {
		// persist to the data layer
		const persistedIngredient = await putIngredient(additionalIngredient);

		// TODO: quantity logic
		const fakeQuantity = 1;
		const recipeIngredient = createRecipeIngredient(
			additionalIngredient,
			persistedIngredient.id,
			fakeQuantity
		);

		// add the new recipe ingredient to the existing recipe ingredients
		const recipeIngredientsCopy = { ...recipe.recipeIngredients };
		recipeIngredientsCopy[persistedIngredient.id] = recipeIngredient;

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
		ingredientOptions,
		handleAddingAsync,
		handleRemoving,
		handleUpdating,
		errors,
		isLoading
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

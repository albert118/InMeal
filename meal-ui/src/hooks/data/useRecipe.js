import { useEffect, useState } from 'react';
import defaultRequestOptions from '../fetch/defaultRequestOptions';
import { ApiConfig } from 'config';
import { defaultRecipe } from 'types/DefaultRecipe';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const getRecipe = async id => {
			const url = `${ApiConfig.API_URL}/recipes/${id}`;

			setLoading(true);

			const response = await fetch(url, { ...defaultRequestOptions });

			const responseBody = await response.json();
			setRecipe(responseBody);

			setLoading(false);
		};

		if (!recipeId) {
			return;
		}

		getRecipe(recipeId);
	}, []);

	const postRecipe = async recipe => {
		const url = `${ApiConfig.API_URL}/recipes/add`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(recipe)
		});

		const responseBody = await response.json();
		const persistedRecipeId = responseBody;
		recipe.id = persistedRecipeId;
		setRecipe(recipe);

		setLoading(false);
	};

	const postEditedRecipe = async recipe => {
		const url = `${ApiConfig.API_URL}/recipes/edit`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(recipe)
		});

		setRecipe(recipe);

		// TODO: bug here as we return state early
		setLoading(false);
	};

	return { postEditedRecipe, postRecipe, recipe, isLoading };
}

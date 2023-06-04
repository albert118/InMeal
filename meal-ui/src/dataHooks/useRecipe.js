import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		getRecipe(recipeId);
	}, []);

	const getRecipe = async id => {
		const url = `${ApiConfig.API_URL}/recipe?id=${encodeURIComponent(id)}`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'GET'
		});

		setLoading(false);

		if (response.ok) {
			setRecipe(await response.json());
		} else {
			setErrors(response.errors);
		}
	};

	const postRecipe = async recipe => {
		const url = `${ApiConfig.API_URL}/recipe`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(recipe)
		});

		setLoading(false);

		if (response.ok) {
			const persistedRecipeId = await response.json();
			recipe.id = persistedRecipeId;
			setRecipe(recipe);
		} else {
			setErrors(response.errors);
		}
	};

	const patchRecipe = async recipe => {
		const url = `${ApiConfig.API_URL}/recipe`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'PATCH',
			body: JSON.stringify(recipe)
		});

		setLoading(false);

		if (response.ok) {
			setRecipe(recipe);
		} else {
			setErrors(response.errors);
		}
	};

	return { patchRecipe, postRecipe, recipe, isLoading, errors };
}

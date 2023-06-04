import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';
import { defaultRecipe } from 'types/DefaultRecipe';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const getRecipe = async id => {
			const url = `${ApiConfig.API_URL}/recipes/${id}`;

			setLoading(true);

			const response = await fetch(url, {
				...defaultRequestOptions
			});

			if (response.ok) {
				setRecipe(await response.json());
			} else {
				setErrors(response.errors);
			}

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
		const url = `${ApiConfig.API_URL}/recipes/edit`;

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

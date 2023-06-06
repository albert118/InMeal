import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import errorHandler from './errorHandler';
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

			const response = await fetch(url, { ...defaultRequestOptions });
			const responseBody = await response.json();

			if (response.ok) {
				setRecipe(responseBody);
				setErrors(null);
			} else {
				const mappedErrors = errorHandler(responseBody);
				setErrors(mappedErrors);
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

		const responseBody = await response.json();

		if (response.ok) {
			const persistedRecipeId = responseBody;
			recipe.id = persistedRecipeId;
			setRecipe(recipe);
			setErrors(null);
		} else {
			const mappedErrors = errorHandler(responseBody);
			setErrors(mappedErrors);
		}

		setLoading(false);

		return errors;
	};

	const postEditedRecipe = async recipe => {
		const url = `${ApiConfig.API_URL}/recipes/edit`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(recipe)
		});

		const responseBody = await response.json();

		if (response.ok) {
			setRecipe(recipe);
			setErrors(null);
		} else {
			const mappedErrors = errorHandler(responseBody);
			setErrors(mappedErrors);
		}

		setLoading(false);

		return errors;
	};

	return { postEditedRecipe, postRecipe, recipe, isLoading, errors };
}

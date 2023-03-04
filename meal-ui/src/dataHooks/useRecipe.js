import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

const getRecipe = async id => {
	const url = `${ApiConfig.API_URL}/recipe?id=${encodeURIComponent(id)}`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'GET'
	});

	const data = await response.json();

	return data;
};

const postRecipe = async (recipe, ingredients) => {
	const url = `${ApiConfig.API_URL}/recipe`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'POST',
		body: JSON.stringify({
			...recipe,
			recipeIngredientDtos: ingredients
		})
	});

	const data = await response.json();

	return data;
};

const patchRecipe = async (recipe, ingredients) => {
	const url = `${ApiConfig.API_URL}/recipe`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'PATCH',
		body: JSON.stringify({
			...recipe,
			recipeIngredientDtos: ingredients
		})
	});

	return response;
};

const putIngredient = async ingredientName => {
	const url = `${
		ApiConfig.API_URL
	}/ingredient?newIngredientName=${encodeURIComponent(ingredientName)}`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'PUT'
	});

	const data = await response.json();

	return data;
};

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(null);
	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		getRecipe(recipeId).then(data => {
			setRecipe(data);
			toggleLoading(false);
		});
	}, []);

	return { recipe, isLoading };
}

export { getRecipe, patchRecipe, putIngredient, postRecipe };

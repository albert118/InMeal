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

const postRecipe = async recipe => {
	const url = `${ApiConfig.API_URL}/recipe`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'POST',
		body: JSON.stringify(recipe)
	});

	const data = await response.json();

	return data;
};

const patchRecipe = async recipe => {
	const url = `${ApiConfig.API_URL}/recipe`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'PATCH',
		body: JSON.stringify(recipe)
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

const putIngredients = async ingredientNames => {
	// const url = `${ApiConfig.API_URL}/ingredients`;

	// const response = await fetch(url, {
	// 	...defaultRequestOptions,
	// 	method: 'POST',
	// 	body: JSON.stringify(ingredientNames)
	// });

	// const data = await response.json();

	// data is an array of IDs for the added/existing ingredients. Mock it for the moment before adding the API
	// we also assume it comes back in the same order, so that the consumer can zip these back together
	// later this may become an issue and using the name or an explicit tracking ID might become the solution
	// return data;
	return ingredientNames.map(_ => {
		return {
			id: Math.random().toString(),
			name: 'mock API ingredient result'
		};
	});
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

export { getRecipe, patchRecipe, putIngredient, putIngredients, postRecipe };

import { useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useIngredients() {
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

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

	const getIngredientOptions = async () => {
		const url = `${ApiConfig.API_URL}/ingredients/options`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'GET'
		});

		setLoading(false);

		if (response.ok) {
			return await response.json();
		} else {
			setErrors(response.errors);
			return [];
		}
	};

	return { isLoading, errors, putIngredients, getIngredientOptions };
}

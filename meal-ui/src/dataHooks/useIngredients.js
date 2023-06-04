import { useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useIngredients() {
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	const putIngredients = async ingredientNames => {
		const url = `${ApiConfig.API_URL}/ingredients`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(ingredientNames)
		});

		setLoading(false);

		if (response.ok) {
			return await response.json();
		} else {
			setErrors(response.errors);
			return [];
		}
	};

	const getIngredientOptions = async () => {
		const url = `${ApiConfig.API_URL}/ingredients/all`;

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

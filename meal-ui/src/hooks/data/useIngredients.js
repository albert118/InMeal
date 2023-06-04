import { useState, useEffect } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useIngredients() {
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		getIngredients();
	}, []);

	const putIngredients = async ingredientNames => {
		const url = `${ApiConfig.API_URL}/ingredients`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify({
				ingredientNames: ingredientNames
			})
		});

		setLoading(false);

		if (response.ok) {
			return await response.json();
		} else {
			setErrors(response.errors);
			return [];
		}
	};

	const getIngredients = async () => {
		const url = `${ApiConfig.API_URL}/ingredients/all`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'GET'
		});

		if (response.ok) {
			setIngredients(await response.json());
		} else {
			setErrors(response.errors);
			setIngredients([]);
		}

		setLoading(false);
	};

	return { isLoading, errors, putIngredients, ingredients };
}

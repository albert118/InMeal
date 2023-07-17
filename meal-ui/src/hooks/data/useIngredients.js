import { useState, useEffect } from 'react';
import defaultRequestOptions from '../fetch/defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useIngredients() {
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getIngredients = async () => {
			const url = `${ApiConfig.API_URL}/ingredients/all`;

			setLoading(true);

			const response = await fetch(url, {
				...defaultRequestOptions,
				method: 'GET'
			});

			const responseBody = await response.json();

			setIngredients(responseBody);

			setLoading(false);
		};

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

		let retVal = [];

		retVal = await response.json();

		setLoading(false);
		return retVal;
	};

	return { isLoading, putIngredients, ingredients };
}

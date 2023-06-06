import { useState, useEffect } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';
import errorHandler from './errorHandler';

export default function useIngredients() {
	const [ingredients, setIngredients] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const getIngredients = async () => {
			const url = `${ApiConfig.API_URL}/ingredients/all`;

			setLoading(true);

			const response = await fetch(url, {
				...defaultRequestOptions,
				method: 'GET'
			});

			const responseBody = await response.json();

			if (response.ok) {
				setIngredients(responseBody);
				setErrors(null);
			} else {
				setIngredients([]);
				const mappedErrors = errorHandler(responseBody);
				setErrors(mappedErrors);
			}

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

		const responseBody = await response.json();
		let retVal = [];

		if (response.ok) {
			retVal = await response.json();
			setErrors(null);
		} else {
			const mappedErrors = errorHandler(responseBody);
			setErrors(mappedErrors);
		}

		setLoading(false);
		return retVal;
	};

	return { isLoading, errors, putIngredients, ingredients };
}

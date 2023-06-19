import { useState, useEffect } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';
import errorHandler from './errorHandler';

export default function useAlphabeticallyIndexedIngredients() {
	const [indexedIngredients, setIndexedIngredients] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const getIndexedIngredients = async () => {
			const url = `${ApiConfig.API_URL}/ingredients/indexed`;

			setLoading(true);

			const response = await fetch(url, {
				...defaultRequestOptions,
				method: 'GET'
			});

			const responseBody = await response.json();

			if (response.ok) {
				setIndexedIngredients(responseBody);
				setErrors(null);
			} else {
				setIndexedIngredients({});
				const mappedErrors = errorHandler(responseBody);
				setErrors(mappedErrors);
			}

			setLoading(false);
		};

		getIndexedIngredients();
	}, []);

	return { isLoading, errors, indexedIngredients };
}

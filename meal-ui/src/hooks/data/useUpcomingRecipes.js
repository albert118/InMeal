import { useEffect, useState, useRef } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';
import errorHandler from './errorHandler';

export default function useUpcomingRecipes(mapper) {
	const [isLoading, setLoading] = useState(false);
	const upcomingRecipesRef = useRef([]);
	const errorsRef = useRef(null);

	useEffect(() => {
		fetchUpcomingRecipes();
	}, []);

	const fetchUpcomingRecipes = async () => {
		const url = `${ApiConfig.API_URL}/upcoming`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST'
		});

		const responseBody = await response.json();

		if (response.ok) {
			upcomingRecipesRef.current = responseBody.map(mapper);
			errorsRef.current = null;
		} else {
			const mappedErrors = errorHandler(responseBody);
			errorsRef.current = mappedErrors;
		}

		// setLoading(false);
	};

	return {
		upcomingRecipes: upcomingRecipesRef.current,
		fetchUpcomingRecipes,
		isLoading,
		errors: errorsRef.current
	};
}

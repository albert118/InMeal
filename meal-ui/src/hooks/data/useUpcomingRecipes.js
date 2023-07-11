import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';
import errorHandler from './errorHandler';

export default function useUpcomingRecipes(mapper) {
	const [isLoading, setLoading] = useState(true);
	const [upcomingRecipes, setUpcomingRecipes] = useState([]);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const fetchUpcomingRecipes = async () => {
			const url = `${ApiConfig.API_URL}/upcoming/recommended`;

			const response = await fetch(url, {
				...defaultRequestOptions,
				method: 'POST'
			});

			const responseBody = await response.json();

			if (response.ok) {
				setUpcomingRecipes(responseBody.map(mapper));
				setErrors(null);
			} else {
				const mappedErrors = errorHandler(responseBody);
				setErrors(mappedErrors);
			}
		};

		setLoading(true);
		fetchUpcomingRecipes();
		setLoading(false);
	}, []);

	return {
		upcomingRecipes,
		isLoading,
		errors
	};
}

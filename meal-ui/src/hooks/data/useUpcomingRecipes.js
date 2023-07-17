import { useEffect, useState } from 'react';
import defaultRequestOptions from '../fetch/defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useUpcomingRecipes(mapper) {
	const [isLoading, setLoading] = useState(true);
	const [upcomingRecipes, setUpcomingRecipes] = useState([]);

	useEffect(() => {
		const fetchUpcomingRecipes = async () => {
			const url = `${ApiConfig.API_URL}/upcoming/recommended`;

			const response = await fetch(url, {
				...defaultRequestOptions,
				method: 'POST'
			});

			const responseBody = await response.json();

			setUpcomingRecipes(responseBody.map(mapper));
		};

		setLoading(true);
		fetchUpcomingRecipes();
		setLoading(false);
	}, []);

	return {
		upcomingRecipes,
		isLoading
	};
}

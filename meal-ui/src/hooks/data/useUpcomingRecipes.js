import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useUpcomingRecipes(mapper) {
	const [upcomingRecipes, setUpcomingRecipes] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

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

		setLoading(false);

		if (response.ok) {
			setUpcomingRecipes((await response.json()).map(mapper));
		} else {
			setErrors(response.errors);
		}

		return;
	};

	return { upcomingRecipes, fetchUpcomingRecipes, isLoading, errors };
}

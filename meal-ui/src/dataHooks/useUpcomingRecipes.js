import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

const postUpcomingRecipes = async () => {
	const url = `${ApiConfig.API_URL}/upcoming`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'POST'
	});

	return await response.json();
};

export default function useUpcomingRecipes(mapper) {
	const [upcomingRecipes, setUpcomingRecipes] = useState([]);
	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		postUpcomingRecipes().then(data => {
			setUpcomingRecipes(data.map(mapper));
			toggleLoading(false);
		});
	}, []);

	return { upcomingRecipes, isLoading };
}

export { postUpcomingRecipes };

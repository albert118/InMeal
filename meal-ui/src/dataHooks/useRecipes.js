import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

const getRecipes = async ids => {
	const url = `${ApiConfig.API_URL}/recipes`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'POST',
		body: JSON.stringify(ids)
	});

	return await response.json();
};

export default function useRecipes(recipeIds, mapper) {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		getRecipes(recipeIds).then(data => {
			setRecipes(data.map(mapper));
			toggleLoading(false);
		});
	}, []);

	return { recipes, isLoading };
}

export { getRecipes };

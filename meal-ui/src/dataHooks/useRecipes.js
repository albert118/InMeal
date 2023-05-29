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

const getAllRecipes = async () => {
	const url = `${ApiConfig.API_URL}/recipes`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'GET'
	});

	return await response.json();
};

const getArchivedRecipes = async () => {
	const url = `${ApiConfig.API_URL}/archiverecipes`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'GET'
	});

	return await response.json();
};

const archiveRecipes = async ids => {
	const url = `${ApiConfig.API_URL}/archiverecipes`;

	const response = await fetch(url, {
		...defaultRequestOptions,
		method: 'POST',
		body: JSON.stringify(ids)
	});

	return response;
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

function useAllRecipes(mapper) {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, toggleLoading] = useState(true);
	const [_includeArchived, setIncludeArchived] = useState(false);
	const [shouldRefresh, toggleRefresh] = useState(false);

	const refreshData = args => {
		if (args) {
			const { includeArchived } = args;
			setIncludeArchived(includeArchived);
		}

		toggleRefresh(!shouldRefresh);
	};

	useEffect(() => {
		if (_includeArchived) {
			getArchivedRecipes().then(data => {
				setRecipes(data.map(mapper));
			});
		} else {
			getAllRecipes().then(data => {
				setRecipes(data.map(mapper));
				toggleLoading(false);
			});
		}
	}, [shouldRefresh]);

	return { recipes, isLoading, refreshData };
}

export { useAllRecipes, archiveRecipes };

import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useAllRecipes(mapper) {
	const [recipes, setRecipes] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const [includeArchived, setIncludeArchived] = useState(false);

	const [shouldRefresh, toggleRefresh] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (includeArchived) {
			getRecipesWithArchivedResults();
		} else {
			getAllRecipes();
		}

		setLoading(false);
	}, [shouldRefresh]);

	const getAllRecipes = async () => {
		const url = `${ApiConfig.API_URL}/recipes`;

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'GET'
		});

		if (response.ok) {
			setRecipes((await response.json()).map(mapper));
		} else {
			setErrors(response.errors);
		}
	};

	const getRecipesWithArchivedResults = async () => {
		const url = `${ApiConfig.API_URL}/archiverecipes`;

		const response = await fetch(url, {
			...defaultRequestOptions
		});

		if (response.ok) {
			setRecipes((await response.json()).map(mapper));
		} else {
			setErrors(response.errors);
		}
	};

	const refreshData = args => {
		if (args) {
			const { includeArchived } = args;
			setIncludeArchived(includeArchived);
		}

		toggleRefresh(!shouldRefresh);
	};

	const archiveRecipes = async ids => {
		const url = `${ApiConfig.API_URL}/archiverecipes`;

		await fetch(url, {
			...defaultRequestOptions,
			method: 'POST',
			body: JSON.stringify(ids)
		});
	};

	return { recipes, archiveRecipes, isLoading, errors, refreshData };
}

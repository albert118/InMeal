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
	}, [shouldRefresh]);

	const getAllRecipes = async () => {
		const url = `${ApiConfig.API_URL}/recipes/everything`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'POST'
		});

		if (response.ok) {
			setRecipes((await response.json()).map(mapper));
		} else {
			setErrors(response.errors);
		}

		setLoading(false);
	};

	const getRecipesWithArchivedResults = async () => {
		const url = `${ApiConfig.API_URL}/archiverecipes`;

		setLoading(true);

		const response = await fetch(url, {
			...defaultRequestOptions
		});

		if (response.ok) {
			setRecipes((await response.json()).map(mapper));
		} else {
			setErrors(response.errors);
		}

		setLoading(false);
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

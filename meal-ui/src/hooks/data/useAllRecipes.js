import { useEffect, useState } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useAllRecipes(mapper) {
	const [recipes, setRecipes] = useState([]);
	const [includeArchived, setIncludeArchived] = useState(false);
	const [shouldRefresh, toggleRefresh] = useState(false);

	const { getApi, postApi } = useFetch();

	useEffect(() => {
		if (includeArchived) {
			getRecipesWithArchivedResults();
		} else {
			getAllRecipes();
		}
	}, [shouldRefresh]);

	const getAllRecipes = async () => {
		const url = `${ApiConfig.API_URL}/recipes/everything`;
		postApi(url).then(data => setRecipes(data.map(mapper)));
	};

	const getRecipesWithArchivedResults = async () => {
		const url = `${ApiConfig.API_URL}/recipes/archived`;
		getApi(url).then(data => setRecipes(data.map(mapper)));
	};

	const refreshData = args => {
		if (args) {
			const { includeArchived } = args;
			setIncludeArchived(includeArchived);
		}

		toggleRefresh(!shouldRefresh);
	};

	const archiveRecipes = async ids => {
		const url = `${ApiConfig.API_URL}/recipes/archive`;
		postApi(url, ids);
	};

	return { recipes, archiveRecipes, refreshData };
}

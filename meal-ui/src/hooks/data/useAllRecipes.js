import { useEffect, useState, useContext } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useAllRecipes(mapper) {
	const [recipes, setRecipes] = useState([]);
	const [includeArchived, setIncludeArchived] = useState(false);
	const [shouldRefresh, toggleRefresh] = useState(false);

	const { setError } = useContext(ErrorDetailContext);

	const { getApi, postApi } = useFetch();

	useEffect(() => {
		if (includeArchived) {
			getRecipesWithArchivedResults();
		} else {
			getAllRecipes();
		}
	}, [shouldRefresh]);

	function getAllRecipes() {
		const url = `${ApiConfig.API_URL}/recipes/everything`;
		postApi(url)
			.then(data => {
				setRecipes(data.map(mapper));
				setError(null);
			})
			.catch(setError);
	}

	function getRecipesWithArchivedResults() {
		const url = `${ApiConfig.API_URL}/recipes/archived`;
		getApi(url)
			.then(data => {
				setRecipes(data.map(mapper));
				setError(null);
			})
			.catch(setError);
	}

	function refreshData(args) {
		if (args) {
			const { includeArchived } = args;
			setIncludeArchived(includeArchived);
		}

		toggleRefresh(!shouldRefresh);
	}

	function archiveRecipes(ids) {
		const url = `${ApiConfig.API_URL}/recipes/archive`;
		postApi(url, ids)
			.then(() => setError(null))
			.catch(setError);
	}

	return { recipes, archiveRecipes, refreshData };
}

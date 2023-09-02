import { useEffect, useState, useContext } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useAllRecipes() {
	const [recipes, setRecipes] = useState([]);
	const [includeArchived, setIncludeArchived] = useState(false);
	const [shouldRefresh, toggleRefresh] = useState(false);

	const { setError } = useContext(ErrorDetailContext);

	const { getApi, postApi } = useFetch();

	useEffect(() => {
		if (includeArchived) {
			getRecipesWithArchivedResults();
		} else {
			getAllGroupedByCourse();
		}
	}, [shouldRefresh]);

	function getAllGroupedByCourse() {
		const url = `${ApiConfig.API_URL}/recipes/all/bycourse`;
		postApi(url)
			.then(data => {
				setRecipes(data);
				setError(null);
			})
			.catch(setError);
	}

	function getRecipesWithArchivedResults() {
		const url = `${ApiConfig.API_URL}/recipes/all/archived`;
		getApi(url)
			.then(data => {
				setRecipes(data);
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

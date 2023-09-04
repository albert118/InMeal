import { useEffect, useState, useContext } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useAllRecipes() {
	const [recipes, setRecipes] = useState([]);
	const [includeArchived, setIncludeArchived] = useState(false);
	const [shouldRefresh, toggleRefresh] = useState(false);

	const { setError } = useContext(ErrorDetailContext);

	const { postApi } = useFetch();

	useEffect(() => {
		getAllGroupedByCourse(includeArchived);
	}, [shouldRefresh]);

	function getAllGroupedByCourse(includeArchived) {
		const url = `${ApiConfig.API_URL}/recipes/all/bycourse`;
		postApi(url, { includeArchived: includeArchived })
			.then(data => {
				setRecipes(data.recipes);
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

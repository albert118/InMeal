import { useEffect, useState, useContext } from 'react';
import { ApiConfig } from 'config';
import { defaultRecipe } from 'types/DefaultRecipe';
import { ErrorDetailContext } from './errorContext';
import { useFetch } from 'hooks/fetch';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const { getApi, postApi } = useFetch();
	const { setError } = useContext(ErrorDetailContext);

	function getRecipe(id) {
		if (id === undefined) return;
		const url = `${ApiConfig.API_URL}/recipes/${id}`;
		getApi(url)
			.then(data => {
				setRecipe(data);
				setError(null);
			})
			.catch(setError);
	}

	useEffect(() => {
		getRecipe(recipeId);
	}, []);

	function postRecipe(newRecipe, onSuccess) {
		const url = `${ApiConfig.API_URL}/recipes/add`;
		postApi(url, newRecipe)
			.then(data => {
				setRecipe({ ...newRecipe, id: data });
				setError(null);
				if (!!onSuccess && typeof onSuccess === 'function') onSuccess(data);
			})
			.catch(setError);
	}

	function postEditedRecipe(editedRecipe) {
		const url = `${ApiConfig.API_URL}/recipes/edit`;
		postApi(url, editedRecipe)
			.then(_ => {
				setRecipe(editedRecipe);
				setError(null);
			})
			.catch(setError);
	}

	return { postEditedRecipe, postRecipe, recipe };
}

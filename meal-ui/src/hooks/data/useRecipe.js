import { useEffect, useState } from 'react';
import { ApiConfig } from 'config';
import { defaultRecipe } from 'types/DefaultRecipe';
import { useFetch } from 'hooks/fetch';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const { getApi, postApi } = useFetch();

	function getRecipe(id) {
		const url = `${ApiConfig.API_URL}/recipes/${id}`;
		getApi(url).then(data => setRecipe(data));
	}

	useEffect(() => {
		if (!recipeId) return;
		getRecipe(recipeId);
	}, []);

	function postRecipe(newRecipe) {
		const url = `${ApiConfig.API_URL}/recipes/add`;
		postApi(url, newRecipe).then(data => {
			setRecipe({ ...newRecipe, id: data });
		});
	}

	function postEditedRecipe(editedRecipe) {
		const url = `${ApiConfig.API_URL}/recipes/edit`;
		postApi(url, editedRecipe).then(_ => setRecipe(editedRecipe));
	}

	return { postEditedRecipe, postRecipe, recipe };
}

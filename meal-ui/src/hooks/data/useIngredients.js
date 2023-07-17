import { useState, useEffect } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useIngredients() {
	const [ingredients, setIngredients] = useState([]);
	const { getApi, postApi } = useFetch();

	function getIngredients() {
		const url = `${ApiConfig.API_URL}/ingredients/all`;
		getApi(url).then(data => setIngredients(data));
	}

	function putIngredients(ingredientNames) {
		const url = `${ApiConfig.API_URL}/ingredients/add`;
		const body = { ingredientNames: ingredientNames };
		postApi(url, body).then(data => setIngredients(ingredients.concat(data)));
	}

	useEffect(() => {
		getIngredients();
	}, []);

	return { putIngredients, ingredients };
}

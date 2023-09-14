import { useState, useContext } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useIngredient() {
	const { getApi, patchApi, postApi } = useFetch();
	const { setError } = useContext(ErrorDetailContext);
	const [ingredient, setIngredient] = useState(null);

	function getIngredient(ingredientId) {
		const url = `${ApiConfig.API_URL}/ingredients/${ingredientId}`;
		return getApi(url)
			.then(ingredient => {
				setError(null);
				setIngredient(ingredient);
			})
			.catch(errorDetail => {
				setError(errorDetail);
			});
	}

	function updateIngredient(id, newName, newUnit) {
		const url = `${ApiConfig.API_URL}/ingredients/update`;
		return patchApi(url, {
			ingredientId: id,
			newName: newName,
			newUnit: newUnit
		})
			.then(() => {
				setError(null);
			})
			.catch(errorDetail => {
				setError(errorDetail);
			});
	}

	function deleteIngredient(id) {
		const url = `${ApiConfig.API_URL}/ingredients/delete`;
		const body = { ingredientIds: [id] };
		return postApi(url, body)
			.then(() => {
				setError(null);
			})
			.catch(errorDetail => {
				setError(errorDetail);
			});
	}

	function postIngredient(ingredientName) {
		const url = `${ApiConfig.API_URL}/ingredients/add`;
		const body = { ingredientNames: [ingredientName] };
		return postApi(url, body)
			.then(ingredients => {
				setError(null);
				return ingredients[0];
			})
			.catch(errorDetail => {
				setError(errorDetail);
			});
	}

	return { ingredient, getIngredient, updateIngredient, postIngredient, deleteIngredient };
}

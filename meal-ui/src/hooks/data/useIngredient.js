import { useContext, useState } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useIngredient() {
	const { patchApi, postApi } = useFetch();
	const { setError } = useContext(ErrorDetailContext);
	const [newIngredient, setNewIngredient] = useState(null);

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
				// allows the modal consumer to determine if an error exists
				return true;
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
				return true;
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
				return true;
			});
	}

	return { updateIngredient, postIngredient, deleteIngredient, newIngredient };
}

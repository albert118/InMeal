import { useContext } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useIngredient() {
	const { patchApi, deleteApi } = useFetch();
	const { setError } = useContext(ErrorDetailContext);

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
		const url = `${ApiConfig.API_URL}/ingredients/delete/${id}`;
		return deleteApi(url)
			.then(() => {
				setError(null);
			})
			.catch(errorDetail => {
				setError(errorDetail);
				return true;
			});
	}

	return { updateIngredient, deleteIngredient };
}

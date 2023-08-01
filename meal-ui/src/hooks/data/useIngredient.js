import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useIngredient() {
	const { patchApi, deleteApi } = useFetch();

	function updateIngredient(id, newName, newUnit) {
		const url = `${ApiConfig.API_URL}/ingredients/update`;
		return patchApi(url, {
			ingredientId: id,
			newName: newName,
			newUnit: newUnit
		});
	}

	function deleteIngredient(id) {
		const url = `${ApiConfig.API_URL}/ingredients/delete/${id}`;
		return deleteApi(url);
	}

	return { updateIngredient, deleteIngredient };
}

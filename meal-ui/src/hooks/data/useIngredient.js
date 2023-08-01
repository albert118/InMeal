import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useIngredient() {
	const { patchApi, deleteApi } = useFetch();

	function updateIngredientName(id, newName, newUnit) {
		const url = `${ApiConfig.API_URL}/ingredients/update`;
		patchApi(url, {
			ingredientId: id,
			newName: newName,
			newUnit: newUnit
		});
	}

	function deleteIngredient(id) {
		const url = `${ApiConfig.API_URL}/ingredients/delete/${id}`;
		deleteApi(url);
	}

	return { updateIngredientName, deleteIngredient };
}

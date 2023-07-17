import { useState } from 'react';
import defaultRequestOptions from '../fetch/defaultRequestOptions';
import { ApiConfig } from 'config';

export default function useIngredient() {
	const updateIngredientName = async (id, newName) => {
		const url = `${ApiConfig.API_URL}/ingredients/update`;

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'PATCH',
			body: JSON.stringify({
				ingredientId: id,
				newName: newName
			})
		});
	};

	const deleteIngredient = async id => {
		const url = `${ApiConfig.API_URL}/ingredients/delete/${id}`;

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'DELETE'
		});
	};

	return { updateIngredientName, deleteIngredient };
}

import { useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';
import errorHandler from './errorHandler';
import { ApiConfig } from 'config';

export default function useIngredient() {
	const [errors, setErrors] = useState(null);

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

		const responseBody = await response.json();

		if (response.ok) {
			setErrors(null);
		} else {
			const mappedErrors = errorHandler(responseBody);
			setErrors(mappedErrors);
		}

		return errors;
	};

	const deleteIngredient = async id => {
		const url = `${ApiConfig.API_URL}/ingredients/delete/${id}`;

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'DELETE'
		});

		const responseBody = await response.json();

		if (response.ok) {
			setErrors(null);
		} else {
			const mappedErrors = errorHandler(responseBody);
			setErrors(mappedErrors);
		}

		return errors;
	};

	return { updateIngredientName, deleteIngredient, errors };
}

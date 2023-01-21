import { useEffect, useState } from 'react';
import defaultRequestOptions from './defaultRequestOptions';

export default function useRecipe(recipeId) {
	const [recipe, setRecipe] = useState(null);
	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		const loadRecipe = async () => {
			const url = `https://localhost:7078/api/recipe?id=${encodeURIComponent(
				recipeId
			)}`;

			const data = await (
				await fetch(url, { ...defaultRequestOptions, method: 'GET' })
			).json();

			setRecipe(data);
			toggleLoading(false);
		};

		loadRecipe();
	}, []);

	return { recipe, isLoading };
}

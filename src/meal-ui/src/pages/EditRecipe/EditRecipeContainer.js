import React, { useEffect, useState } from 'react';
import GenericPageContainer from 'pages/GenericPageContainer';
import { useParams } from 'react-router-dom';
import View from './View';

const defaultRequestOptions = Object.freeze({
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
	redirect: 'follow',
	referrerPolicy: 'no-referrer'
});

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState({});
	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			const url = `https://localhost:7078/api/recipe?id=${encodeURIComponent(
				recipeId
			)}`;

			const data = await (
				await fetch(url, { ...defaultRequestOptions, method: 'GET' })
			).json();

			setRecipe(data);
			toggleLoading(false);
		};

		loadData();
	}, [recipeId]);

	return (
		<GenericPageContainer>
			{!isLoading ? <View existingRecipe={recipe} /> : 'loading...'}
		</GenericPageContainer>
	);
}

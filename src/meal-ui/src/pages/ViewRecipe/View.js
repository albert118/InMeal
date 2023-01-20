import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';

const demoImage = {
	label: null,
	url: 'https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif'
};

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

export default function View() {
	const { recipeId } = useParams();

	const [recipe, setRecipe] = useState({});

	const [isLoading, toggleLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			const url = `https://localhost:7078/api/recipe?id=${encodeURIComponent(
				recipeId
			)}`;

			const loadedRecipe = await (
				await fetch(url, { ...defaultRequestOptions, method: 'GET' })
			).json();

			setRecipe(loadedRecipe);
		};

		loadData();
		toggleLoading(!isLoading);
	}, []);

	return (
		<div className='p-recipe-view'>
			<RecipeCard
				recipe={recipe}
				status={FormStatuses.Unknown}
				isLoading={isLoading}
			>
				<img
					src={demoImage.url}
					alt={recipe.title}
				/>
			</RecipeCard>
		</div>
	);
}

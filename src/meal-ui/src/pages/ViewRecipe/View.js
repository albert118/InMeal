import React from 'react';
import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';

const demoImage = {
	label: null,
	url: 'https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif'
};

export default function View(props) {
	const { recipe, isLoading } = props;

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

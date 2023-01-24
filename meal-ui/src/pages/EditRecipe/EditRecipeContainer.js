import React from 'react';
import GenericPageContainer from 'pages/GenericPageContainer';
import { useParams } from 'react-router-dom';
import View from './View';
import useRecipe from 'dataHooks/useRecipe';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<GenericPageContainer>
			{!isLoading ? <View existingRecipe={recipe} /> : 'loading...'}
		</GenericPageContainer>
	);
}

import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe, useIngredients } from 'hooks/data';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { postEditedRecipe, recipe } = useRecipe(recipeId);
	const { ingredients } = useIngredients();

	return (
		<View
			existingRecipe={recipe}
			ingredientOptions={ingredients}
			postEditedRecipe={postEditedRecipe}
		/>
	);
}

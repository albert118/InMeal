import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe, useIngredients } from 'hooks/data';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const {
		postEditedRecipe,
		recipe,
		isLoading: isLoadingRecipe
	} = useRecipe(recipeId);
	const { ingredients, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	return isLoadingIngredientOptions || isLoadingRecipe ? (
		'loading...'
	) : (
		<View
			existingRecipe={recipe}
			ingredientOptions={ingredients}
			postEditedRecipe={postEditedRecipe}
		/>
	);
}

import View from './View';
import { useParams } from 'react-router-dom';
import useRecipe from 'dataHooks/useRecipe';
import { useIngredients } from 'dataHooks';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading: isLoadingRecipe } = useRecipe(recipeId);
	const { ingredients, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	return !(isLoadingIngredientOptions && isLoadingRecipe) ? (
		<View
			existingRecipe={recipe}
			ingredientOptions={ingredients}
		/>
	) : (
		'loading...'
	);
}

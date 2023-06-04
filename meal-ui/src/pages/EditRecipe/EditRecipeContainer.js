import View from './View';
import { useParams } from 'react-router-dom';
import useRecipe from 'hooks/data/useRecipe';
import { useIngredients } from 'hooks';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const {
		patchRecipe,
		recipe,
		isLoading: isLoadingRecipe
	} = useRecipe(recipeId);
	const { ingredients, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	console.log(recipe);

	return isLoadingIngredientOptions || isLoadingRecipe ? (
		'loading...'
	) : (
		<View
			existingRecipe={recipe}
			ingredientOptions={ingredients}
			patchRecipe={patchRecipe}
		/>
	);
}

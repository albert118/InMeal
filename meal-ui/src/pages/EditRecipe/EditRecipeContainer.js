import { useMemo } from 'react';
import View from './View';
import { useParams } from 'react-router-dom';
import useRecipe from 'dataHooks/useRecipe';
import { useIngredients } from 'dataHooks';

export default async function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading: isLoadingRecipe } = useRecipe(recipeId);
	const { getIngredientOptions, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	const ingredientOptions = useMemo(async () => await getIngredientOptions());

	return !(isLoadingIngredientOptions && isLoadingRecipe) ? (
		<View
			existingRecipe={recipe}
			ingredientOptions={ingredientOptions}
		/>
	) : (
		'loading...'
	);
}

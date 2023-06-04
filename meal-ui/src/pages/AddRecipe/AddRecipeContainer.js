import View from './View';
import { useIngredients, useRecipe } from 'hooks/data';

export default function AddRecipeContainer() {
	const { ingredients, isLoading: isLoadingIngredients } = useIngredients();
	const {
		patchRecipe,
		postRecipe,
		isLoading: isLoadingRecipe
	} = useRecipe(undefined);

	return !(isLoadingIngredients && isLoadingRecipe) ? (
		<View
			ingredientOptions={ingredients}
			patchRecipe={patchRecipe}
			postRecipe={postRecipe}
		/>
	) : (
		'loading...'
	);
}

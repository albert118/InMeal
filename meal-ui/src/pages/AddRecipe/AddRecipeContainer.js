import View from './View';
import { useIngredients } from 'dataHooks';
import { useRecipe } from 'dataHooks';

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

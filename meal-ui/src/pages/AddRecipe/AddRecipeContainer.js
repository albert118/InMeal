import View from './View';
import { useIngredients, useRecipe } from 'hooks/data';

export default function AddRecipeContainer() {
	const { ingredients, isLoading: isLoadingIngredients } = useIngredients();
	const {
		postEditedRecipe,
		postRecipe,
		isLoading: isLoadingRecipe
	} = useRecipe(undefined);

	return !(isLoadingIngredients && isLoadingRecipe) ? (
		<View
			ingredientOptions={ingredients}
			postEditedRecipe={postEditedRecipe}
			postRecipe={postRecipe}
		/>
	) : (
		'loading...'
	);
}

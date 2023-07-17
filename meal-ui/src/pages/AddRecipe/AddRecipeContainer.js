import View from './View';
import { useIngredients, useRecipe } from 'hooks/data';

export default function AddRecipeContainer() {
	const { ingredients } = useIngredients();
	const { postEditedRecipe, postRecipe } = useRecipe(undefined);

	return (
		<View
			ingredientOptions={ingredients}
			postEditedRecipe={postEditedRecipe}
			postRecipe={postRecipe}
		/>
	);
}

import View from './View';
import { useIngredients, useRecipe } from 'hooks/data';
import { useContext, useEffect } from 'react';
import { LayoutContext } from 'pages/Layout';

export default function AddRecipeContainer() {
	const { ingredients, isLoading: isLoadingIngredients } = useIngredients();
	const {
		postEditedRecipe,
		postRecipe,
		isLoading: isLoadingRecipe
	} = useRecipe(undefined);

	const { setIsLoading } = useContext(LayoutContext);

	useEffect(() => {
		setIsLoading(isLoadingIngredients || isLoadingRecipe);
	}, [isLoadingIngredients, isLoadingRecipe]);

	return (
		<View
			ingredientOptions={ingredients}
			postEditedRecipe={postEditedRecipe}
			postRecipe={postRecipe}
		/>
	);
}

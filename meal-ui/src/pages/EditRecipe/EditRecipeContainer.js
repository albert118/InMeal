import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe, useIngredients } from 'hooks/data';
import { useContext, useEffect } from 'react';
import { LayoutContext } from 'pages/Layout';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const {
		postEditedRecipe,
		recipe,
		isLoading: isLoadingRecipe
	} = useRecipe(recipeId);
	const { ingredients, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	const { setIsLoading } = useContext(LayoutContext);

	useEffect(() => {
		setIsLoading(isLoadingIngredientOptions || isLoadingRecipe);
	}, [isLoadingIngredientOptions, isLoadingRecipe]);

	return (
		!isLoadingRecipe && (
			<View
				existingRecipe={recipe}
				ingredientOptions={ingredients}
				postEditedRecipe={postEditedRecipe}
			/>
		)
	);
}

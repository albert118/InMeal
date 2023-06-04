import { useMemo } from 'react';
import View from './View';
import { useIngredients } from 'dataHooks';

export default async function AddRecipeContainer() {
	const { getIngredientOptions, isLoading: isLoadingIngredientOptions } =
		useIngredients();

	const ingredientOptions = useMemo(async () => await getIngredientOptions());

	return !isLoadingIngredientOptions ? (
		<View ingredientOptions={ingredientOptions} />
	) : (
		'loading...'
	);
}

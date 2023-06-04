import View from './View';
import { useIngredients } from 'dataHooks';

export default function AddRecipeContainer() {
	const { ingredients, isLoading } = useIngredients();

	return !isLoading ? <View ingredientOptions={ingredients} /> : 'loading...';
}

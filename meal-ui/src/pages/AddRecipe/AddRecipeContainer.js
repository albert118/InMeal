import View from './View';
import { useIngredients } from 'hooks/data';

export default function AddRecipeContainer() {
	const { ingredients } = useIngredients();

	return <View ingredientOptions={ingredients} />;
}

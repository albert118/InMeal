import View from './View';
import { useIngredients } from 'hooks/data';

export default function EditRecipeContainer() {
	const { ingredients } = useIngredients();

	return <View ingredientOptions={ingredients} />;
}

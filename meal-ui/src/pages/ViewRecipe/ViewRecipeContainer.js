import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe } from 'hooks/data';

export default function ViewRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe } = useRecipe(recipeId);

	return <View recipe={recipe} />;
}

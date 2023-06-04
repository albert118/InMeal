import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe } from 'hooks/data';

export default function ViewRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<div className='p-recipe'>
			{isLoading ? 'loading...' : <View recipe={recipe} />}
		</div>
	);
}

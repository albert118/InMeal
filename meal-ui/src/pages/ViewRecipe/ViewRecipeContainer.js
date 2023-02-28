import View from './View';
import GenericPageContainer from 'pages/GenericPageContainer';
import { useParams } from 'react-router-dom';
import useRecipe from 'dataHooks/useRecipe';

export default function ViewRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<GenericPageContainer>
			<div className='p-recipe'>
				{isLoading ? 'loading...' : <View recipe={recipe} />}
			</div>
		</GenericPageContainer>
	);
}

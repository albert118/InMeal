import GenericPageContainer from 'pages/GenericPageContainer';
import { useParams } from 'react-router-dom';
import View from './View';
import useRecipe from 'dataHooks/useRecipe';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<GenericPageContainer>
			<div className='p-recipe'>
				{!isLoading ? <View existingRecipe={recipe} /> : 'loading...'}
			</div>
		</GenericPageContainer>
	);
}

import View from './View';
import Layout from 'pages/GenericPageContainer';
import { useParams } from 'react-router-dom';
import useRecipe from 'dataHooks/useRecipe';

export default function ViewRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<Layout>
			<div className='p-recipe'>
				{isLoading ? 'loading...' : <View recipe={recipe} />}
			</div>
		</Layout>
	);
}

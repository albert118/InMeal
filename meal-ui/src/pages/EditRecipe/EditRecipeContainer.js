import Layout from 'pages/Layout';
import View from './View';
import { useParams } from 'react-router-dom';
import useRecipe from 'dataHooks/useRecipe';

export default function EditRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	return (
		<Layout className='p-recipe'>
			{!isLoading ? <View existingRecipe={recipe} /> : 'loading...'}
		</Layout>
	);
}

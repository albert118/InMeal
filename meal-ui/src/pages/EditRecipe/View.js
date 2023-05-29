import { HomeButton } from 'components/Button';
import { EditRecipeForm } from './Forms/EditRecipeForm';

export default function View({ existingRecipe }) {
	return (
		<div className='thing'>
			<HomeButton />
			<EditRecipeForm existingRecipe={existingRecipe} />
		</div>
	);
}

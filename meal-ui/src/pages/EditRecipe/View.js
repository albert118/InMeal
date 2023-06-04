import { HomeButton } from 'components/Button';
import { EditRecipeForm } from './Forms/EditRecipeForm';

export default function View({ existingRecipe, ingredientOptions }) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<EditRecipeForm
				existingRecipe={existingRecipe}
				ingredientOptions={ingredientOptions}
			/>
		</div>
	);
}

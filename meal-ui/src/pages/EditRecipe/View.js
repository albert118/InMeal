import { HomeButton } from 'components/Button';
import { EditRecipeForm } from 'forms/Recipe';

export default function View({
	existingRecipe,
	ingredientOptions,
	postEditedRecipe
}) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<EditRecipeForm
				existingRecipe={existingRecipe}
				ingredientOptions={ingredientOptions}
				postEditedRecipe={postEditedRecipe}
			/>
		</div>
	);
}

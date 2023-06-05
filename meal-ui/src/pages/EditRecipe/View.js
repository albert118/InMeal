import { HomeButton } from 'components/Button';
import { EditRecipeForm } from 'forms/Recipe';

export default function View({
	existingRecipe,
	ingredientOptions,
	patchRecipe
}) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<EditRecipeForm
				existingRecipe={existingRecipe}
				ingredientOptions={ingredientOptions}
				patchRecipe={patchRecipe}
			/>
		</div>
	);
}

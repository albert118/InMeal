import { AddRecipeForm } from 'forms/Recipe';
import { HomeButton } from 'components/Button';

export default function View({
	ingredientOptions,
	postEditedRecpie,
	postRecipe
}) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm
				ingredientOptions={ingredientOptions}
				postEditedRecpie={postEditedRecpie}
				postRecipe={postRecipe}
			/>
		</div>
	);
}

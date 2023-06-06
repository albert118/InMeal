import { AddRecipeForm } from 'forms/Recipe';
import { HomeButton } from 'components/Button';

export default function View({
	ingredientOptions,
	postEditedRecipe,
	postRecipe
}) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm
				ingredientOptions={ingredientOptions}
				postEditedRecipe={postEditedRecipe}
				postRecipe={postRecipe}
			/>
		</div>
	);
}

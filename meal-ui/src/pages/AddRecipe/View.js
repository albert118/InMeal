import { AddRecipeForm } from 'forms/Recipe';
import { HomeButton } from 'components/Button';

export default function View({ ingredientOptions, patchRecipe, postRecipe }) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm
				ingredientOptions={ingredientOptions}
				patchRecipe={patchRecipe}
				postRecipe={postRecipe}
			/>
		</div>
	);
}

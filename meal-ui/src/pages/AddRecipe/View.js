import { AddRecipeForm } from './Forms/AddRecipeForm';
import { HomeButton } from 'components/Button';

export default function View({ ingredientOptions }) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm ingredientOptions={ingredientOptions} />
		</div>
	);
}

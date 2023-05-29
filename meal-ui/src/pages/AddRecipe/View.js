import { AddRecipeForm } from './Forms/AddRecipeForm';
import { HomeButton } from 'components/Button';

export default function View() {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm />
		</div>
	);
}

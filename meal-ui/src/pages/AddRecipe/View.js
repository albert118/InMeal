import { AddRecipeForm } from './AddRecipeForm';
import { HomeButton } from 'components/Button';

export default function View() {
	return (
		<div className='p-recipe-view'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddRecipeForm />
		</div>
	);
}

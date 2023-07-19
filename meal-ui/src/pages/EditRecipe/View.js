import { HomeButton } from 'components/Button';
import { AddOrEdit } from 'forms/Recipe';

export default function View({ ingredientOptions }) {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddOrEdit ingredientOptions={ingredientOptions} />
		</div>
	);
}

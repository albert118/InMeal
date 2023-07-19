import { AddOrEdit } from 'forms/Recipe';
import { HomeButton } from 'components/Button';

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

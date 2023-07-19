import { HomeButton } from 'components/Button';
import { AddOrEdit } from 'forms/Recipe';

export default function View() {
	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<AddOrEdit />
		</div>
	);
}

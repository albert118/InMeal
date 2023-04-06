import { useNavigate } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import { Checkbox } from 'forms/Inputs';
import Button from 'components/Button';

export function ManagementHeader({ handleViewArchived, handleDeleteSelected }) {
	const navigate = useNavigate();

	return (
		<div className='grid-header'>
			<div className='font-white-header'>Manage Recipes</div>
			<div className='grid-actions'>
				<Checkbox
					className='font-white'
					value={false}
					label='view archived'
					handler={handleViewArchived}
				/>
				<Button
					handler={() => navigate(`${AppRoutes.recipe}/add`)}
					kind='secondary'
					className='add-recipes-btn'
				>
					add
				</Button>
				<Button
					handler={handleDeleteSelected}
					kind='secondary'
					className='delete-recipes-btn'
				>
					archive
				</Button>
			</div>
		</div>
	);
}

import { useNavigate } from 'react-router-dom';
import { Checkbox } from 'forms/Inputs';
import { Button } from 'components';
import AppRoutes from 'navigation/AppRoutes';

export function ManagementHeader({ handleViewArchived, handleDeleteSelected }) {
	const navigate = useNavigate();

	return (
		<div className='recipes-grid-header'>
			<h2>Manage Recipes</h2>
			<div className='recipes-grid-header--actions'>
				<Checkbox
					className='font-white'
					label='view archived'
					handler={handleViewArchived}
				/>
				<Button
					onClick={() => navigate(`${AppRoutes.recipe}/add`)}
					kind='secondary'
					className='add-recipes-btn'
				>
					add
				</Button>
				<Button
					onClick={handleDeleteSelected}
					kind='secondary'
					className='delete-recipes-btn'
				>
					archive
				</Button>
			</div>
		</div>
	);
}

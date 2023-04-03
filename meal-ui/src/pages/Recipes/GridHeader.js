import Button from 'components/Button';
import { Checkbox } from 'forms/Inputs';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

export function GridHeader({ handleViewArchived, handleDeleteSelected }) {
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
					className='add-recipes-btn'
				>
					add
				</Button>
				<Button
					handler={handleDeleteSelected}
					className='delete-recipes-btn'
				>
					archive
				</Button>
			</div>
		</div>
	);
}

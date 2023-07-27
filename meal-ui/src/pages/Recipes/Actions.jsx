import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Button } from 'components';
import { Checkbox } from 'forms/Inputs';

export function Actions({ onViewArchived, onArchive }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<Checkbox
				className='font-white'
				label='view archived'
				onClick={onViewArchived}
			/>
			<Button
				onClick={() => navigate(`${AppRoutes.recipe}/add`)}
				kind='secondary'
				className='add-recipes-btn'
			>
				add
			</Button>
			<Button
				onClick={onArchive}
				kind='secondary'
				className='delete-recipes-btn'
			>
				archive
			</Button>
		</div>
	);
}

import Button from 'components/Button';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

export function GridHeader() {
	const navigate = useNavigate();

	return (
		<div className='grid-header'>
			<div className='font-white-header'>Manage Recipes</div>
			<div className='grid-actions'>
				<Button
					handler={() => navigate(`${AppRoutes.recipe}/add`)}
					className='add-recipes-btn'
				>
					add
				</Button>
				<Button
					handler={() => console.log('handled')}
					className='delete-recipes-btn'
				>
					delete
				</Button>
			</div>
		</div>
	);
}

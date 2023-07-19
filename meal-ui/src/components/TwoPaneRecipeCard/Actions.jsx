import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Button } from 'components';

export function Actions({ recipeId }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<Button onClick={() => navigate(`${AppRoutes.recipe}/edit/${recipeId}`)}>edit</Button>
		</div>
	);
}

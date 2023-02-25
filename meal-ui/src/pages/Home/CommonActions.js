import { SimpleCard } from 'components/Card';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';

export function CommonActions() {
	const navigate = useNavigate();

	return (
		<SimpleCard>
			<div>
				Recipes
				<div className='action-option'>
					Add a new recipe
					<Button handler={() => navigate(`${AppRoutes.recipe}/add`)}>
						Add
					</Button>
				</div>
			</div>
			<div>
				Pantry
				<div className='action-option'>
					Update the pantry
					<Button handler={() => navigate(`${AppRoutes.root}`)}>
						add ingredients
					</Button>
				</div>
			</div>
			<div>
				Planning
				<div className='action-option'>
					Create a meal plan
					<Button handler={() => navigate(`${AppRoutes.root}`)}>
						plan
					</Button>
				</div>
			</div>
		</SimpleCard>
	);
}

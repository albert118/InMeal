import { SimpleCard } from 'components/Card';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { Stack } from '@carbon/react';
import Button from 'components/Button';

export function CommonActions() {
	const navigate = useNavigate();

	return (
		<SimpleCard>
			<Stack gap={8}>
				<div>
					Recipes
					<div className='action-option'>
						Add a new recipe
						<Button
							kind='secondary'
							onClick={() => navigate(`${AppRoutes.recipe}/add`)}
						>
							Add
						</Button>
					</div>
				</div>
				<div>
					Pantry
					<div className='action-option'>
						Update the pantry
						<Button
							kind='secondary'
							onClick={() => navigate(`${AppRoutes.root}`)}
						>
							add ingredients
						</Button>
					</div>
				</div>
				<div>
					Planning
					<div className='action-option'>
						Create a meal plan
						<Button
							kind='secondary'
							onClick={() => navigate(`${AppRoutes.root}`)}
						>
							plan
						</Button>
					</div>
				</div>
			</Stack>
		</SimpleCard>
	);
}

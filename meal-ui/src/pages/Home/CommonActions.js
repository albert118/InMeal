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
					<div className='action-option'>
						<label>Recipes</label>
						<span>Add a new recipe</span>
						<Button
							kind='ghost'
							onClick={() => navigate(`${AppRoutes.recipe}/add`)}
						>
							Add
						</Button>
					</div>
				</div>
				<div>
					<div className='action-option'>
						<label>Pantry</label>
						<span>Update the pantry</span>
						<Button
							kind='ghost'
							onClick={() => navigate(`${AppRoutes.root}`)}
						>
							add ingredients
						</Button>
					</div>
				</div>
				<div>
					<div className='action-option'>
						<label>Planning</label>
						<span>Create a meal plan</span>
						<Button
							kind='ghost'
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

import { Button, Toggle } from 'components';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, onArchive, onViewArchived } = useManagementTable();

	return (
		<div>
			<Actions
				onArchive={onArchive}
				onViewArchived={onViewArchived}
			/>
			{objectMap(recipes, (group, recipes) => {
				return (
					<ManageRecipesRow
						label={group}
						key={group}
						recipes={recipes}
						className='index-row'
					/>
				);
			})}
		</div>
	);
}

function Actions({ onViewArchived, onArchive }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<div className='action-container__card'>
				<div className='filters'>
					<Toggle
						id='1'
						labelText='view archived'
						onClick={onViewArchived}
					/>
				</div>
				<div className='actions'>
					<Button
						onClick={() => navigate(`${AppRoutes.recipe}/add`)}
						kind='secondary'
					>
						add
					</Button>
					<Button
						onClick={onArchive}
						kind='secondary'
					>
						archive
					</Button>
				</div>
			</div>
		</div>
	);
}

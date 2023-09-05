import { Button, Toggle } from 'components';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, ...hookProps } = useManagementTable();

	return (
		<div>
			<Actions {...hookProps} />
			{objectMap(recipes, (group, recipes) => {
				return (
					<ManageRecipesRow
						label={group}
						onClick={onAddOrRemove}
						key={group}
						recipes={recipes}
						className='index-row'
					/>
				);
			})}
		</div>
	);
}

function Actions({ onViewArchived, onArchive, selectedItems, onRestore }) {
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
						kind='primary'
					>
						add
					</Button>
					<Button
						onClick={onArchive}
						kind='secondary'
						disabled={selectedItems.length < 1}
					>
						archive
					</Button>
					<Button
						onClick={onRestore}
						kind='secondary'
						disabled={selectedItems.length < 1}
					>
						restore
					</Button>
				</div>
			</div>
		</div>
	);
}

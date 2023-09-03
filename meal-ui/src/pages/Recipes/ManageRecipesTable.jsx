import { Actions } from './Actions';
import useManagementTable from './useManagementTable';
import ManageRecipesRow from './ManageRecipesRow';
import { objectMap } from 'utils';

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

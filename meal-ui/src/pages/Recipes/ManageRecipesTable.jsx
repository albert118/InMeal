import { Actions } from './Actions';
import useManagementTable from './useManagementTable';
import ManageRecipesRow from './ManageRecipesRow';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, onArchive, onViewArchived } = useManagementTable();
	console.log(recipes);
	return (
		<div>
			<Actions
				onArchive={onArchive}
				onViewArchived={onViewArchived}
			/>
			{recipes.map(recipe => {
				return (
					<ManageRecipesRow
						label={1}
						key={recipe.id}
						className='index-row'
					/>
				);
			})}
		</div>
	);
}

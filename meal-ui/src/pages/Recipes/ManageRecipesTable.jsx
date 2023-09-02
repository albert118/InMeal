import { Grid, Column } from '@carbon/react';
import { RecipeGrid } from './RecipeGrid';
import { Actions } from './Actions';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, onArchive, onViewArchived } = useManagementTable();

	return (
		<Grid>
			<Column
				lg={16}
				md={8}
				sm={4}
			>
				<div className='recipes-grid-header'>
					<h2>Manage Recipes</h2>
				</div>
				<RecipeGrid
					addOrRemoveSelectedItem={onAddOrRemove}
					recipes={recipes}
				/>
				<Actions
					onArchive={onArchive}
					onViewArchived={onViewArchived}
				/>
			</Column>
		</Grid>
	);
}

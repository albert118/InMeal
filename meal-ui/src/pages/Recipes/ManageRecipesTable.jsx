import { Grid, Column } from '@carbon/react';
import { Actions } from './Actions';
import useManagementTable from './useManagementTable';
import { SelectableRecipeCard } from 'components/RecipeCard';

export function ManageRecipesTable() {
	const { recipes, onAddOrRemove, onArchive, onViewArchived } = useManagementTable();

	return (
		<Grid>
			<Column
				lg={16}
				md={8}
				sm={4}
			>
				{recipes.map(recipe => (
					<SelectableRecipeCard
						key={recipe.id}
						className='recipe-grid--tile'
						recipe={recipe}
						label={recipe.content.title}
						onClick={recipe.handler}
						onCheck={onAddOrRemove}
					/>
				))}
				<Actions
					onArchive={onArchive}
					onViewArchived={onViewArchived}
				/>
			</Column>
		</Grid>
	);
}

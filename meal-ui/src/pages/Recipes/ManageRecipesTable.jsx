import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { RecipeGrid } from './RecipeGrid';
import { Actions } from './Actions';

export function ManageRecipesTable({ recipes, refreshGrid, archiveRecipes }) {
	const [selectedItems, setSelectedItems] = useState([]);

	const addSelectedItem = newItem => {
		setSelectedItems([...selectedItems, newItem]);
	};

	const removeSelectedItem = oldItem => {
		const idx = selectedItems.indexOf(oldItem);

		if (idx > -1) {
			const tempItems = [...selectedItems];
			tempItems.splice(idx, 1);
			setSelectedItems(tempItems);
		} else {
			console.warn('cannot remove unknown item from grid');
		}
	};

	const addOrRemoveSelectedItem = (item, toggle) => {
		toggle ? addSelectedItem(item) : removeSelectedItem(item);
	};

	const onArchive = async () => {
		await archiveRecipes(selectedItems);
		refreshGrid();
	};

	const onViewArchived = event => {
		refreshGrid({ includeArchived: event.target.checked });
	};

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
					addOrRemoveSelectedItem={addOrRemoveSelectedItem}
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

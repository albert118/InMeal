import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { ManagementHeader } from './GridHeader';
import { RecipeGrid } from './RecipeGrid';

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

	const handleDeleteSelected = async () => {
		await archiveRecipes(selectedItems);
		refreshGrid();
	};

	const handleViewArchived = event => {
		refreshGrid({ includeArchived: event.target.checked });
	};

	return (
		<Grid>
			<Column
				lg={16}
				md={8}
				sm={4}
			>
				<ManagementHeader
					handleDeleteSelected={handleDeleteSelected}
					handleViewArchived={handleViewArchived}
				/>
				<RecipeGrid
					addOrRemoveSelectedItem={addOrRemoveSelectedItem}
					recipes={recipes}
				/>
			</Column>
		</Grid>
	);
}

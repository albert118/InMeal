import { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { archiveRecipes } from 'dataHooks/useRecipes';
import { ManagementHeader } from './GridHeader';
import { RecipeGrid } from './RecipeGrid';

export default function View({ recipes, refreshGrid }) {
	return (
		<div className='p-manage-recipes'>
			<ManageRecipesTable
				recipes={recipes}
				refreshGrid={refreshGrid}
			/>
		</div>
	);
}

function ManageRecipesTable({ recipes, refreshGrid }) {
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
		if (toggle) {
			addSelectedItem(item);
		} else {
			removeSelectedItem(item);
		}
	};

	const handleDeleteSelected = async () => {
		await archiveRecipes(selectedItems);
		refreshGrid();
	};

	const handleViewArchived = async event => {
		await refreshGrid({ includeArchived: event.target.checked });
	};

	return (
		<Grid
			fullwidth
			className='p-manage-recipes'
		>
			<Column
				className='p-manage-recipes__r1'
				lg={16}
				md={8}
				sm={4}
			>
				<ManagementHeader
					handleDeleteSelected={handleDeleteSelected}
					handleViewArchived={handleViewArchived}
				/>
			</Column>
			<Column
				className='p-manage-recipes__r2'
				lg={16}
				md={8}
				sm={4}
			>
				<RecipeGrid
					addOrRemoveSelectedItem={addOrRemoveSelectedItem}
					recipes={recipes}
				/>
			</Column>
		</Grid>
	);
}

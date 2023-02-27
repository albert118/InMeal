import { useState } from 'react';
import { GridHeader } from './GridHeader';
import { RecipeGrid } from './RecipeGrid';
import { archiveRecipes } from 'dataHooks/useRecipes';

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
		<div className='manage-recipes'>
			<GridHeader
				handleDeleteSelected={handleDeleteSelected}
				handleViewArchived={handleViewArchived}
			/>
			<RecipeGrid
				addOrRemoveSelectedItem={addOrRemoveSelectedItem}
				recipes={recipes}
			/>
		</div>
	);
}

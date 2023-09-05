import { useState } from 'react';
import { useAllRecipes } from 'hooks/data';

export default function useManagementTable() {
	const [selectedItems, setSelectedItems] = useState([]);

	const { recipes, refreshData, archiveRecipes, restoreRecipes } = useAllRecipes();

	function onAddOrRemove(recipe) {
		const addedAlready = selectedItems.indexOf(recipe) > -1;

		if (addedAlready) {
			setSelectedItems([...selectedItems.filter(i => i.id !== recipe.id)]);
		} else {
			setSelectedItems([...selectedItems, recipe]);
		}
	}

	function onArchive() {
		archiveRecipes(selectedItems.map(item => item.id));
		refreshData();
	}

	function onViewArchived(event) {
		refreshData({ includeArchived: event.target.checked });
	}

	function onRestore() {
		restoreRecipes(selectedItems.map(item => item.id));
		refreshData();
	}

	return {
		recipes,
		onAddOrRemove,
		onArchive,
		onViewArchived,
		onRestore,
		selectedItems
	};
}

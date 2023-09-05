import { objectMap } from 'utils';
import { useAllRecipes } from 'hooks/data';
import { useState } from 'react';

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

	function onSelectAll(event) {
		if (event.target.checked) {
			const allRecipes = objectMap(recipes, (_, _recipes) => _recipes).reduce((all, _recipes) =>
				all.concat(_recipes)
			);

			setSelectedItems(allRecipes);
		} else {
			setSelectedItems([]);
		}
	}

	return {
		recipes,
		onAddOrRemove,
		onArchive,
		onViewArchived,
		onRestore,
		onSelectAll,
		selectedItems
	};
}

import { useState, useEffect } from 'react';
import { useAllRecipes } from 'hooks/data';

export default function useManagementTable() {
	const [selectedItems, setSelectedItems] = useState([]);

	const { recipes, refreshData, archiveRecipes } = useAllRecipes();

	useEffect(() => {
		console.log(selectedItems);
	}, [selectedItems]);

	function onAddOrRemove(recipe) {
		const addedAlready = selectedItems.indexOf(recipe) > -1;

		if (addedAlready) {
			setSelectedItems([...selectedItems.filter(i => i.id !== recipe.id)]);
		} else {
			setSelectedItems([...selectedItems, recipe]);
		}
	}

	function onArchive() {
		archiveRecipes(selectedItems);
		refreshData();
	}

	function onViewArchived(event) {
		refreshData({ includeArchived: event.target.checked });
	}

	return {
		recipes,
		onAddOrRemove,
		onArchive,
		onViewArchived
	};
}

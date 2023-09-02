import { useState } from 'react';
import { useAllRecipes } from 'hooks/data';

export default function useManagementTable() {
	const [selectedItems, setSelectedItems] = useState([]);

	const { recipes, refreshData, archiveRecipes } = useAllRecipes();

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

	function onAddOrRemove(item, toggle) {
		toggle ? addSelectedItem(item) : removeSelectedItem(item);
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

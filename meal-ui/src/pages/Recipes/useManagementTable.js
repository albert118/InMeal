import { objectMap } from 'utils';
import { useAllRecipes } from 'hooks/data';
import useTableState from 'hooks/table';
import { useEffect } from 'react';

export default function useManagementTable() {
	const { recipes, refreshData, archiveRecipes, restoreRecipes } = useAllRecipes();

	const { setSelectedItems, setAllItemsSelected, isSelected, setItems, resetItems, tableState } =
		useTableState(recipes);

	useEffect(() => {
		setItems(recipes);
	}, [recipes]);

	function onAddOrRemove(item) {
		if (isSelected(item)) {
			setSelectedItems([...tableState.selectedItems.filter(selectedItem => item !== selectedItem)]);
		} else {
			setSelectedItems([...tableState.selectedItems, item]);
		}
	}

	function onArchive() {
		archiveRecipes(tableState.selectedItems.map(item => item.id)).then(() => refreshData());
	}

	function onViewArchived(event) {
		refreshData({ includeArchived: event.target.checked });
	}

	function onRestore() {
		restoreRecipes(tableState.selectedItems.map(item => item.id)).then(() => refreshData());
	}

	function onSelectAll(event) {
		if (event.target.checked) {
			setAllItemsSelected();
		} else {
			setSelectedItems([]);
		}
	}

	return {
		onAddOrRemove,
		onArchive,
		onViewArchived,
		onRestore,
		onSelectAll,
		isSelected,
		totalCount: tableState.count,
		selectedItems: tableState.selectedItems,
		items: tableState.items
	};
}

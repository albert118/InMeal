import { useState, useEffect } from 'react';
import { objectMap } from 'utils';

export function useTableState(initialItems) {
	const originalItems = Object.freeze(initialItems);
	const [tableState, setTableState] = useState(initialTableState(initialItems));

	useEffect(() => {
		console.log(tableState);
	}, [tableState]);

	function setSelectedItems(updatedValues) {
		setTableState({ ...tableState, selectedItems: updatedValues });
	}

	function setAllItemsSelected() {
		const allItems = objectMap(tableState.items, (_, row) => row).reduce((all, row) =>
			all.concat(row)
		);

		setSelectedItems(allItems);
	}

	function setItems(updatedValues) {
		const totalCount = Object.values(updatedValues)
			.map(row => row.length)
			.reduce((partialSum, a) => partialSum + a, 0);

		setTableState({ ...tableState, items: updatedValues, count: totalCount });
	}

	function resetItems() {
		setItems(originalItems);
	}

	function isSelected(item) {
		return tableState.selectedItems.indexOf(item) > -1;
	}

	return {
		setSelectedItems,
		setAllItemsSelected,
		setItems,
		resetItems,
		isSelected,
		tableState
	};
}

const initialTableState = items => {
	return {
		selectedItems: [],
		items: items ?? [],
		count: 0
	};
};

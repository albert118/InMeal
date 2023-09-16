import { useAlphabeticallyIndexedIngredients, useIngredients } from 'hooks/data';
import { useState, useEffect } from 'react';
import { objectMap } from 'utils';

class TableState {
	constructor() {
		this.selectedItems = [];
		this.items = [];
	}
}

export default function useTable() {
	const [selectedItems, setSelectedItems] = useState([]);

	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();
	const [tableItems, setTableItems] = useState(indexedIngredients ?? []);
	const { deleteIngredients } = useIngredients();

	function onAddOrRemove(item) {
		if (isSelected(item)) {
			setSelectedItems([...selectedItems.filter(i => i.id !== item.id)]);
		} else {
			setSelectedItems([...selectedItems, item]);
		}
	}

	function onDelete() {
		deleteIngredients(selectedItems.map(item => item.id)).then(() => refreshData());
	}

	function onSelectAll(event) {
		if (event.target.checked) {
			const allItems = objectMap(indexedIngredients, (_, ingredients) => ingredients).reduce(
				(all, ingredients) => all.concat(ingredients)
			);

			setSelectedItems(allItems);
		} else {
			setSelectedItems([]);
		}
	}

	function onViewUnused(event) {
		if (event.target.checked) {
			const allUnusedItems = objectMap(indexedIngredients, (_, ingredients) => ingredients).reduce(
				(all, ingredients) =>
					all.concat(ingredients.filter(ingredient => ingredient.recipeUsageCount === 0))
			);

			setTableItems(allUnusedItems);
		} else {
			setTableItems([]);
		}
	}

	const totalCount = Object.values(indexedIngredients)
		.map(category => category.length)
		.reduce((partialSum, a) => partialSum + a, 0);

	function isSelected(item) {
		return selectedItems.indexOf(item) > -1;
	}

	useEffect(() => {}, [tableItems]);

	return {
		indexedIngredients,
		onAddOrRemove,
		totalCount,
		onDelete,
		onSelectAll,
		selectedItems,
		onViewUnused,
		isSelected
	};
}

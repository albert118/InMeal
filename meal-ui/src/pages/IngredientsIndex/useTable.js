import { useAlphabeticallyIndexedIngredients, useMeasurements, useIngredients } from 'hooks/data';
import { useState } from 'react';
import { objectMap } from 'utils';

export default function useTable() {
	const [selectedItems, setSelectedItems] = useState([]);

	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();
	const { measurementOptions } = useMeasurements();
	const { deleteIngredients } = useIngredients();

	function onAddOrRemove(item) {
		const addedAlready = selectedItems.indexOf(item) > -1;

		if (addedAlready) {
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

			setSelectedItems(allUnusedItems);
		} else {
			setSelectedItems([]);
		}
	}

	const totalCount = Object.values(indexedIngredients)
		.map(category => category.length)
		.reduce((partialSum, a) => partialSum + a, 0);

	function isSelected(ingredient) {
		selectedItems.map(i => i.id).includes(ingredient.id);
	}

	return {
		indexedIngredients,
		measurementOptions,
		onAddOrRemove,
		totalCount,
		onDelete,
		onSelectAll,
		selectedItems,
		onViewUnused,
		isSelected
	};
}

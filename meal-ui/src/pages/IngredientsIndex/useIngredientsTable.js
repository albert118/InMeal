import { useAlphabeticallyIndexedIngredients, useIngredients } from 'hooks/data';
import useTableState from 'hooks/table';
import { filterObjectMap } from 'utils';

export default function useIngredientsTable() {
	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();
	const { deleteIngredients } = useIngredients();

	const {
		setSelectedItems,
		setAllItemsSelected,
		isSelected,
		setItems,
		resetItems,
		tableState,
		useFuse
	} = useTableState(indexedIngredients);

	const isIngredientUnused = ingredient => ingredient.recipeUsageCount === 0;

	function onAddOrRemove(item) {
		if (isSelected(item)) {
			setSelectedItems([...tableState.selectedItems.filter(selectedItem => item !== selectedItem)]);
		} else {
			setSelectedItems([...tableState.selectedItems, item]);
		}
	}

	function onDelete() {
		deleteIngredients(tableState.selectedItems.map(item => item.ingredientId)).then(() =>
			refreshData()
		);
	}

	function onSelectAll(event) {
		if (event.target.checked) {
			setAllItemsSelected();
		} else {
			setSelectedItems([]);
		}
	}

	function onViewUnused(event) {
		if (event.target.checked) {
			setItems(filterObjectMap(tableState.items, isIngredientUnused));
		} else {
			resetItems();
		}
	}

	return {
		onAddOrRemove,
		onDelete,
		onSelectAll,
		onViewUnused,
		isSelected,
		useSearch: useFuse,
		totalCount: tableState.count,
		selectedItems: tableState.selectedItems,
		items: tableState.items
	};
}

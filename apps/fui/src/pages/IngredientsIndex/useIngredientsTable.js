import {
    useAlphabeticallyIndexedIngredients,
    useIngredients
} from '../../hooks/data';
import useTableState from '../../hooks/table';
import { filterObjectMap } from '../../utils';

export default function useIngredientsTable() {
    const { indexedIngredients, refreshData } =
        useAlphabeticallyIndexedIngredients();
    const { deleteIngredients } = useIngredients();

    const {
        setSelectedItems,
        setAllItemsSelected,
        isSelected,
        setItems,
        resetItems,
        tableState,
        useFuse
    } = useTableState(indexedIngredients, refreshData);

    const isIngredientUnused = ingredient => ingredient.recipeUsageCount === 0;

    function onAddOrRemove(item) {
        if (isSelected(item)) {
            setSelectedItems([
                ...tableState.selectedItems.filter(
                    selectedItem => item !== selectedItem
                )
            ]);
        } else {
            setSelectedItems([...tableState.selectedItems, item]);
        }
    }

    function onDelete() {
        const toBeDeletedIds = tableState.selectedItems.map(
            item => item.ingredientId
        );
        deleteIngredients(toBeDeletedIds);
        setItems(
            filterObjectMap(
                tableState.items,
                ingredient => !toBeDeletedIds.includes(ingredient.ingredientId)
            )
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

    function canDelete() {
        return (
            tableState.selectedItems.length > 0 &&
            tableState.selectedItems.filter(isIngredientUnused).length ===
                tableState.selectedItems.length
        );
    }

    return {
        onAddOrRemove,
        onDelete,
        onSelectAll,
        onViewUnused,
        isSelected,
        canDelete,
        useSearch: useFuse,
        selectedDisplayCount: `${tableState.selectedItems.length}/${tableState.count}`,
        items: tableState.items
    };
}

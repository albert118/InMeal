import { useAllRecipes } from '../../hooks/data';
import useTableState from '../../hooks/table';

export default function useManagementTable() {
    const { recipes, refreshData, archiveRecipes, restoreRecipes } =
        useAllRecipes();

    const {
        setSelectedItems,
        setAllItemsSelected,
        isSelected,
        useFuse,
        tableState
    } = useTableState(recipes, () => console.log('yis'));

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

    function onArchive() {
        archiveRecipes(tableState.selectedItems.map(item => item.id)).then(() =>
            refreshData()
        );
        setSelectedItems([]);
    }

    function onViewArchived(event) {
        refreshData({ includeArchived: event.target.checked });
    }

    function onRestore() {
        restoreRecipes(tableState.selectedItems.map(item => item.id)).then(() =>
            refreshData()
        );
        setSelectedItems([]);
    }

    function onSelectAll(event) {
        if (event.target.checked) {
            setAllItemsSelected();
        } else {
            setSelectedItems([]);
        }
    }

    function canArchive() {
        return tableState.selectedItems.length > 0;
    }

    function canRestore() {
        return tableState.selectedItems.length > 0;
    }

    return {
        onAddOrRemove,
        onArchive,
        onViewArchived,
        onRestore,
        onSelectAll,
        isSelected,
        canArchive,
        canRestore,
        useSearch: useFuse,
        selectedDisplayCount: `${tableState.selectedItems.length}/${tableState.count}`,
        items: tableState.items
    };
}

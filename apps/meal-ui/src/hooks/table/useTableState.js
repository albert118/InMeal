import Fuse from 'fuse.js';
import { useState, useEffect } from 'react';
import { isFalsishOrEmpty, objectMap, filterObjectMap } from 'utils';

export default function useTableState(initialItems, onRefresh) {
    const [fuse, configureFuse] = useState(null);
    const [tableState, setTableState] = useState(
        initialTableState(initialItems)
    );

    // setup the table once data source has populated
    useEffect(() => {
        initialItems &&
            Object.keys(initialItems).length > 0 &&
            setUpTable(initialItems);
        console.debug('setup table and configured Fuse');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialItems]);

    function setUpTable(initialItems) {
        const totalCount = Object.values(initialItems)
            .map(row => row.length)
            .reduce((partialSum, a) => partialSum + a, 0);

        setTableState({
            ...tableState,
            originalItems: initialItems,
            items: initialItems,
            count: totalCount
        });
        // configure Fuse once per setup to avoid expensive re-calc's
        // keys are just common DTO attributes worth searching, if they don't exist we don't search them
        configureFuse(
            new Fuse(getAllItemsAsList(initialItems), {
                keys: ['name', 'title', 'label']
            })
        );
    }

    function setSelectedItems(updatedValues) {
        setTableState({ ...tableState, selectedItems: updatedValues });
    }

    function setAllItemsSelected() {
        setSelectedItems(getAllItemsAsList(tableState.items));
    }

    function setItems(updatedValues) {
        const totalCount = Object.values(updatedValues)
            .map(row => row.length)
            .reduce((partialSum, a) => partialSum + a, 0);

        // setting items always clears the current selection
        setTableState({
            ...tableState,
            items: updatedValues,
            selectedItems: [],
            count: totalCount
        });
    }

    function resetItems() {
        // onRefresh();
        setItems(tableState.originalItems);
    }

    function isSelected(item) {
        return tableState.selectedItems.indexOf(item) > -1;
    }

    function filterForItems(filterBy) {
        setItems(
            filterObjectMap(tableState.items, item => filterBy.includes(item))
        );
    }

    function useFuse(query) {
        if (isFalsishOrEmpty(query)) {
            console.debug('resettting table search');
            resetItems();
        } else {
            const results = fuse.search(query);
            console.debug(`queried table, found ${results.length} results`);
            filterForItems(results.map(result => result.item));
        }
    }

    return {
        setSelectedItems,
        setAllItemsSelected,
        setItems,
        resetItems,
        isSelected,
        useFuse,
        tableState
    };
}

function getAllItemsAsList(items) {
    return objectMap(items, (_, row) => row).reduce((all, row) =>
        all.concat(row)
    );
}

const initialTableState = items => {
    return {
        originalItems: [],
        selectedItems: [],
        items: items ?? [],
        count: 0
    };
};

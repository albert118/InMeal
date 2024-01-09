import { Button, SearchInput, ToggleInline } from 'components';
import { useState } from 'react';
import { objectMap } from 'utils';
import ManageRecipesRow from './ManageRecipesRow';
import useManagementTable from './useManagementTable';

export function ManageRecipesTable() {
    const { items, ...hookProps } = useManagementTable();

    return (
        <div>
            <Actions {...hookProps} />
            {objectMap(items, (idx, recipes) => {
                return (
                    <ManageRecipesRow
                        key={idx}
                        label={idx}
                        recipes={recipes}
                        {...hookProps}
                    />
                );
            })}
        </div>
    );
}

function Actions({
    selectedDisplayCount,
    onArchive,
    onSelectAll,
    onViewArchived,
    onRestore,
    useSearch,
    canArchive,
    canRestore
}) {
    const [selectAll, setSelectAll] = useState(false);

    return (
        <div className='action-container'>
            <div className='action-container__card'>
                {
                    <div className='filter-info'>
                        <label>
                            <label>selected: {selectedDisplayCount}</label>
                        </label>
                    </div>
                }
                <div className='filters'>
                    <ToggleInline
                        id='select_all'
                        labelText='select all'
                        toggled={selectAll}
                        onClick={event => {
                            setSelectAll(!selectAll);
                            onSelectAll(event);
                        }}
                    />
                    <ToggleInline
                        id='view_archived'
                        labelText='view archived'
                        onClick={event => {
                            onViewArchived(event);
                            setSelectAll(false);
                        }}
                    />
                </div>
                <div className='search'>
                    <SearchInput onSearch={useSearch} />
                </div>
                <div className='actions'>
                    <Button
                        onClick={onArchive}
                        kind='secondary'
                        disabled={!canArchive()}
                    >
                        archive
                    </Button>
                    <Button
                        onClick={onRestore}
                        kind='secondary'
                        disabled={!canRestore()}
                    >
                        restore
                    </Button>
                </div>
            </div>
        </div>
    );
}

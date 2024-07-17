import {
    Button,
    SearchInput,
    ToggleInline,
    GlassBackground
} from '../../components';
import { objectMap } from '../../utils';
import { useState } from 'react';
import { IngredientsIndexRow } from './components';
import useIngredientsTable from './useIngredientsTable';

export default function IngredientsIndexContainer() {
    const { items, ...hookProps } = useIngredientsTable();

    return (
        <div className='p-ingredients'>
            <h2>
                Ingredients
                <label>Manage your pantry&apos;s ingredients</label>
            </h2>

            <Actions {...hookProps} />
            {objectMap(items, (idx, ingredients) => {
                return (
                    <IngredientsIndexRow
                        key={idx}
                        label={idx}
                        ingredients={ingredients}
                        {...hookProps}
                    />
                );
            })}
        </div>
    );
}

function Actions({
    selectedDisplayCount,
    onDelete,
    onSelectAll,
    onViewUnused,
    useSearch,
    canDelete
}) {
    const [selectAll, setSelectAll] = useState(false);

    return (
        <div className='action-container'>
            <div className='action-container__card'>
                <GlassBackground />

                {
                    <div className='filter-info'>
                        <label>selected: {selectedDisplayCount}</label>
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
                        id='select_unused'
                        labelText='view unused'
                        onClick={event => {
                            onViewUnused(event);
                            setSelectAll(false);
                        }}
                    />
                </div>
                <div className='search'>
                    <SearchInput onSearch={useSearch} />
                </div>
                <div className='actions'>
                    <Button
                        onClick={onDelete}
                        kind='secondary'
                        disabled={!canDelete()}
                    >
                        delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

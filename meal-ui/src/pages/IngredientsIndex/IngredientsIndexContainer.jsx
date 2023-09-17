import { Button, SearchInput, ToggleInline } from 'components';
import { useState } from 'react';
import { objectMap } from 'utils';
import { IngredientsIndexRow } from './components';
import useIngredientsTable from './useIngredientsTable';

export default function IngredientsIndexContainer() {
	const { items, ...hookProps } = useIngredientsTable();

	return (
		<div className='p-ingredients'>
			<h2>
				Ingredients
				<label>Manage your pantry's ingredients</label>
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

function Actions({ totalCount, selectedItems, onDelete, onSelectAll, onViewUnused, useSearch }) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='action-container'>
			<div className='action-container__card'>
				{
					<div className='filter-info'>
						<label>
							selected: {selectedItems.length}/{totalCount}
						</label>
					</div>
				}
				<div className='filters'>
					<ToggleInline
						id='select_all'
						labelText='select all'
						onClick={onSelectAll}
					/>
					<ToggleInline
						id='select_unused'
						labelText='view unused'
						onClick={onViewUnused}
					/>
				</div>
				<div className='search'>
					<SearchInput
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						onSearch={useSearch}
					/>
				</div>
				<div className='actions'>
					<Button
						onClick={onDelete}
						kind='secondary'
						disabled={selectedItems.length < 1}
					>
						delete
					</Button>
				</div>
			</div>
		</div>
	);
}

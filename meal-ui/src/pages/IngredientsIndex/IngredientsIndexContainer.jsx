import { Button, ToggleInline } from 'components';
import { objectMap } from 'utils';
import { IngredientsIndexRow } from './components';
import useTable from './useTable';

export default function IngredientsIndexContainer() {
	const {
		indexedIngredients,
		measurementOptions,
		selectedItems,
		onAddOrRemove,
		refreshData,
		...hookProps
	} = useTable();

	return (
		<div className='p-ingredients'>
			<h2>
				Ingredients
				<label>Manage your pantry's ingredients</label>
			</h2>

			<Actions
				selectedItems={selectedItems}
				{...hookProps}
			/>
			{objectMap(indexedIngredients, (idx, ingredients) => {
				return (
					<IngredientsIndexRow
						key={idx}
						label={idx}
						ingredients={ingredients}
						refreshData={refreshData}
						measurementOptions={measurementOptions}
					/>
				);
			})}
		</div>
	);
}

function Actions({ totalCount, selectedItems, onDelete, onSelectAll, onViewUnused }) {
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

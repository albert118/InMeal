import { useState } from 'react';
import { Button, FilterableMultiSelect } from 'components';
import { propagateProps } from 'utils';
import { TextInput } from 'forms/Inputs';

export const multiSelectEvents = Object.freeze({
	Add: 'add',
	Remove: 'remove',
	Update: 'update',
	New: 'new'
});

const defaultItem = '';

// will provide children with these props { item, onRemove, attrName, onChange }
export function MultiSelectWithMultiLine({
	items,
	selectableOptions,
	attrName,
	onChange,
	...additionalProps
}) {
	const [selectedItems, setSelectedItems] = useState([]);
	const [updatedKey, setUpdatedKey] = useState(0);
	const [newItem, setNewItem] = useState(defaultItem);

	function appendExistingItems() {
		selectedItems?.length > 0 &&
			onChange(mapToSyntheticEvent(multiSelectEvents.Add, selectedItems, attrName));

		setSelectedItems([]);
		// this key hack forces the multiselect to reset after using it's selection
		setUpdatedKey(Math.random());
	}

	function addNewItem() {
		onChange(mapToSyntheticEvent(multiSelectEvents.New, newItem, attrName));
		setNewItem(defaultItem);
	}

	function onRemove(id, label) {
		onChange({
			target: {
				id: multiSelectEvents.Remove,
				name: attrName,
				value: { id: id, data: label }
			}
		});
	}

	function onUpdate(event) {
		onChange({
			target: {
				id: multiSelectEvents.Update,
				name: attrName,
				value: { id: event.target.id, data: event.target.value }
			}
		});
	}

	return (
		<div className={`multi-line-input ${additionalProps.className ?? ''}`}>
			<span className='multi-line-input__new'>
				<TextInput
					label='add a new item...'
					value={newItem}
					onChange={event => setNewItem(event.target.value)}
				/>
				<Button
					disabled={!newItem.length > 0}
					onClick={addNewItem}
				>
					add new
				</Button>
			</span>
			<span className='multi-line-input__add'>
				<FilterableMultiSelect
					id='multi-line-input__add-dropdown'
					items={selectableOptions}
					onChange={setSelectedItems}
					key={updatedKey}
					direction='top'
					{...additionalProps}
				/>
				<Button
					disabled={!selectedItems?.length > 0}
					onClick={appendExistingItems}
				>
					add
				</Button>
			</span>

			{items?.map(item =>
				propagateProps(additionalProps.children, { item, onRemove, attrName, onUpdate })
			)}
		</div>
	);
}

function mapToSyntheticEvent(eventType, data, attrName) {
	return {
		target: {
			id: eventType,
			name: attrName,
			value: { id: null, data: data }
		}
	};
}

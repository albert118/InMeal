import { useState } from 'react';
import { Button, FilterableMultiSelect } from 'components';
import { propagateProps } from 'utils';
import { TextInput } from 'forms/Inputs';

export const multiSelectEvents = Object.freeze({
	Add: 'add',
	Remove: 'remove',
	Update: 'update'
});

const defaultItem = Object.freeze({
	id: null,
	label: ''
});

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

	function appendNewItems() {
		selectedItems?.length > 0 && onChange(mapToSyntheticEvent(selectedItems, attrName));

		setSelectedItems([]);
		// this key hack forces the multiselect to reset after using it's selection
		setUpdatedKey(Math.random());
	}

	function addNewItem() {
		onChange(mapToSyntheticEvent(newItem, attrName));
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
					value={newItem.label}
					onChange={event => setNewItem({ ...newItem, label: event.target.value })}
				/>
				<Button
					disabled={!newItem.label.length > 0}
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
					onClick={appendNewItems}
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

function mapToSyntheticEvent(data, attrName) {
	return {
		target: {
			id: multiSelectEvents.Add,
			name: attrName,
			value: { id: null, data: data }
		}
	};
}

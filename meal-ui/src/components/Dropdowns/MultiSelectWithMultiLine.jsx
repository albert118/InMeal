import { useState } from 'react';
import { Button, FilterableMultiSelect } from 'components';
import { propagateProps } from 'utils';
import { TextInput } from 'forms/Inputs';

export const multiSelectEvents = Object.freeze({
	Add: 'add',
	Remove: 'remove',
	Update: 'update'
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

	function appendNewItems() {
		selectedItems?.length > 0 &&
			onChange({
				target: {
					id: multiSelectEvents.Add,
					name: attrName,
					value: { id: null, data: selectedItems }
				}
			});

		setSelectedItems([]);
		// this key hack forces the multiselect to reset after using it's selection
		setUpdatedKey(Math.random());
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
					// className='e-full-width-new-item'
					value={newItem.label}
					onChange={event => addSingleItem(event.target.value)}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</span>
			<span className='multi-line-input__add'>
				<FilterableMultiSelect
					label={selectedItems.length === 0 ? 'choose ingredients' : `ingredients selected`}
					id='multi-line-input__add-multi-select'
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

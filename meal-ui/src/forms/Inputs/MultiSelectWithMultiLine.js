import { useState } from 'react';
import { default as TextInput } from './TextInput';
import { default as MultiSelectCustom } from './MultiSelectCustom';
import Button from 'components/Button';
import { isFalsishOrEmpty } from 'utils';

export const multiSelectEvents = Object.freeze({
	New: 'new',
	Existing: 'existing',
	Remove: 'remove',
	Update: 'update'
});

export default function MultiSelectWithMultiLine({
	className,
	items,
	selectableOptions,
	attrName,
	onChange,
	placeholder
}) {
	const [newItem, setNewItem] = useState(createNewItem(''));
	const [canAddItems, setCanAddItems] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const [updatedKey, setUpdatedKey] = useState(0);

	function appendNewItems() {
		if (selectedItems?.length > 0) {
			onChange({
				target: {
					id: multiSelectEvents.Existing,
					name: attrName,
					value: { id: null, data: selectedItems }
				}
			});
		} else {
			onChange({
				target: {
					id: multiSelectEvents.New,
					name: attrName,
					value: { id: null, data: newItem }
				}
			});
		}

		setNewItem(createNewItem(''));
		setSelectedItems([]);
		// this key hack forces the multiselect to reset after using it's selection
		setUpdatedKey(Math.random());
		setCanAddItems(false);
	}

	function editExistingItem(event) {
		if (isFalsishOrEmpty(event.target.value)) {
			onChange({
				target: {
					id: multiSelectEvents.Update,
					name: attrName,
					value: MultiSelectEventValue(event)
				}
			});
		} else {
			onChange({
				target: {
					id: multiSelectEvents.Remove,
					name: attrName,
					value: MultiSelectEventValue(event)
				}
			});
		}
	}

	function addSingleItem(event) {
		setNewItem(createNewItem(event.target.value));
		setCanAddItems(event.target.value !== '');
	}

	const handleKeyDown = event => {
		event.preventDefault();
		event.key === 'Enter' && appendNewItems();
	};

	return (
		<div className={className ? `multi-line-input ${className}` : `multi-line-input`}>
			<span className='add-new-item'>
				<TextInput
					className='e-full-width-new-item'
					value={newItem.label}
					handler={addSingleItem}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</span>
			<span className='add-new-item'>
				<MultiSelectCustom
					label={selectedItems.length === 0 ? 'choose ingredients' : `ingredients selected`}
					id='add-new-item-multi-select'
					items={mapToDropdownItems(selectableOptions)}
					setSelectedItems={items => {
						setSelectedItems(items);
						setCanAddItems(items.length > 0);
					}}
					key={updatedKey}
				/>
				<Button
					disabled={!canAddItems}
					onClick={appendNewItems}
				>
					add
				</Button>
			</span>

			{items &&
				items.map(item => (
					<TextInput
						key={item.hasOwnProperty('label') ? item.label : item}
						id={item.id}
						name={attrName}
						value={item.hasOwnProperty('label') ? item.label : item}
						handler={editExistingItem}
					/>
				))}
		</div>
	);
}

class MultiSelectEventValue {
	constructor(event) {
		this.id = event.target.id;
		this.data = event.target.value;
	}
}

function createNewItem(textValue) {
	return {
		id: 0,
		label: textValue
	};
}

function mapToDropdownItems(items) {
	return items.map(item => {
		return {
			id: item.id,
			label: item.name
		};
	});
}

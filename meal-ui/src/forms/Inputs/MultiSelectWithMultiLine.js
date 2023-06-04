import { useState } from 'react';
import { default as TextInput } from './TextInput';
import { default as MultiSelectCustom } from './MultiSelectCustom';
import Button from 'components/Button';
import { objectMap } from 'utils';

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

// will set newly added item IDs to 'new-item'
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

	const appendNewItems = () => {
		// by using a fake event, consumers can re-use existing form handlers that would expect event.target data
		if (selectedItems && selectedItems.length > 0) {
			onChange({
				target: {
					id: 'existing-items',
					name: attrName,
					value: selectedItems
				}
			});
		} else {
			onChange({
				target: {
					id: 'new-item',
					name: attrName,
					value: newItem
				}
			});
		}

		setNewItem(createNewItem(''));
		setSelectedItems([]);
		setUpdatedKey(Math.random());
		setCanAddItems(false);
	};

	const addSingleItem = textValue => {
		setNewItem(createNewItem(textValue));
		setCanAddItems(textValue !== '');
	};

	const handleKeyDown = event => {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		appendNewItems();
	};

	return (
		<div
			className={
				className ? `multi-line-input ${className}` : `multi-line-input`
			}
		>
			<span className='add-new-item'>
				<TextInput
					className='e-full-width-new-item'
					value={newItem.label}
					handler={event => addSingleItem(event.target.value)}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</span>
			<span className='add-new-item'>
				<MultiSelectCustom
					label={
						selectedItems.length === 0
							? 'choose ingredients'
							: `ingredients selected`
					}
					id='add-new-item-multi-select'
					items={mapToDropdownItems(selectableOptions)}
					setSelectedItems={items => {
						setSelectedItems(items);
						setCanAddItems(items.length > 0);
					}}
					// this key hack forces the multiselect to reset after using it's selection
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
				objectMap(items, (key, value) => (
					<TextInput
						key={key}
						id={key}
						name={attrName}
						value={
							value.hasOwnProperty('label') ? value.label : value
						}
						handler={onChange}
					/>
				))}
		</div>
	);
}

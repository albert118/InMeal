import { useState } from 'react';
import { default as MultiSelectCustom } from './MultiSelectCustom';
import MultiSelectItemBadge from './MultiSelectItemBadge';
import { Button } from 'components';

export const multiSelectEvents = Object.freeze({
	Add: 'add',
	Remove: 'remove'
});

export default function MultiSelectWithMultiLine({
	className,
	items,
	selectableOptions,
	attrName,
	onChange
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

	return (
		<div className={`multi-line-input ${className ?? ''}`}>
			<span className='add-new-item'>
				<MultiSelectCustom
					label={selectedItems.length === 0 ? 'choose ingredients' : `ingredients selected`}
					id='add-new-item-multi-select'
					items={mapToDropdownItems(selectableOptions)}
					setSelectedItems={setSelectedItems}
					key={updatedKey}
				/>
				<Button
					disabled={!selectedItems?.length > 0}
					onClick={appendNewItems}
				>
					add
				</Button>
			</span>

			{items?.map(item => (
				<MultiSelectItemBadge
					item={item}
					attrName={attrName}
					onChange={onRemove}
					key={item.hasOwnProperty('label') ? item.label : item}
				/>
			))}
		</div>
	);
}

function mapToDropdownItems(items) {
	return items.map(item => {
		return {
			id: item.id,
			label: item.name
		};
	});
}

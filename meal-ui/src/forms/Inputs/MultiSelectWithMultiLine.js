import { useState } from 'react';
import { Button, MultiSelect } from 'components';
import { propagateProps } from 'utils';

export const multiSelectEvents = Object.freeze({
	Add: 'add',
	Remove: 'remove',
	Update: 'update'
});

// will provide children with these props { item, onRemove, attrName, onChange }
export default function MultiSelectWithMultiLine({
	className,
	items,
	selectableOptions,
	attrName,
	onChange,
	...props
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
		<div className={`multi-line-input ${className ?? ''}`}>
			<span className='add-new-item'>
				<MultiSelect
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

			{items?.map(item => propagateProps(props.children, { item, onRemove, attrName, onUpdate }))}
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

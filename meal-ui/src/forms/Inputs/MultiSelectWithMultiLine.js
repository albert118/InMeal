import { useState } from 'react';
import { default as TextInput } from './TextInput';
import { default as MultiSelectCustom } from './MultiSelectCustom';
import Button from 'components/Button';
import { objectMap } from 'utils';

// will set newly added item IDs to 'new-item'
export default function MultiSelectWithMultiLine({
	className,
	items,
	selectableOptions,
	attrName,
	onChange,
	placeholder
}) {
	const [newItem, setNewItem] = useState('');
	const [selectedItemIds, setSelectedItemIds] = useState([]);
	const [canAddItems, setCanAddItems] = useState(false);

	const appendNewItems = () => {
		// by using a fake event, consumers can re-use existing form handlers that would expect event.target data

		const newItems =
			selectedItemIds && selectedItemIds.length > 0
				? getSelectableItems().filter(item =>
						selectedItemIds.includes(item.id)
				  )
				: newItem;

		onChange({
			target: {
				id: 'new-item',
				name: attrName,
				value: newItems
			}
		});

		setNewItem('');
		setSelectedItemIds([]);
		setCanAddItems(false);
	};

	const addSingleItem = newItem => {
		setNewItem(newItem);
		setCanAddItems(newItem !== '');
	};

	const getSelectableItems = () => {
		return selectableOptions
			? objectMap(selectableOptions, (key, value) => {
					return { id: key, label: value.label };
			  })
			: [];
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
					value={newItem}
					handler={event =>
						addSingleItem({ id: 0, label: event.target.value })
					}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</span>
			<span className='add-new-item'>
				<MultiSelectCustom
					label={
						selectedItemIds.length === 0
							? 'choose ingredients'
							: `ingredients selected`
					}
					id='add-new-item-multi-select'
					items={getSelectableItems()}
					setSelectedItemIds={ids => {
						setSelectedItemIds(ids);
						setCanAddItems(ids.length > 0);
					}}
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

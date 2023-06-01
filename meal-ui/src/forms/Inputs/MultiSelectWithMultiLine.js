import { useState } from 'react';
import { default as TextInput } from './TextInput';
import { default as MultiSelectCustom } from './MultiSelectCustom';
import Button from 'components/Button';
import { objectMap } from 'utils';

// will set newly added item IDs to 'new-item'
export default function MultiSelectWithMultiLine({
	className,
	items,
	attrName,
	onChange,
	placeholder
}) {
	const [newItem, setNewItem] = useState('');
	const [selectedItemIds, setSelectedItemIds] = useState([]);

	const appendNewItem = () => {
		// by using a fake event, consumers can re-use existing form handlers that would expect event.target data
		onChange({
			target: {
				id: 'new-item',
				name: 'recipeIngredients',
				value: newItem
			}
		});

		setNewItem('');
		setSelectedItemIds([]);
	};

	const getSelectableItems = () => {
		return objectMap(items, (key, value) => {
			return { id: key, label: value.label };
		});
	};

	const handleKeyDown = event => {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		appendNewItem();
	};

	return (
		<div
			className={
				className ? `multi-line-input ${className}` : `multi-line-input`
			}
		>
			<span className='add-new-item'>
				<TextInput
					className='new-ingredient other-thing'
					name='new-ingredient'
					value={newItem}
					handler={event => setNewItem(event.target.value)}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
				/>
			</span>
			<span className='add-new-item'>
				<MultiSelectCustom
					className='new-ingredient'
					name='new-ingredient'
					id='new-ingredient'
					label={
						selectedItemIds.length === 0
							? 'choose ingredients'
							: `ingredients selected`
					}
					items={getSelectableItems()}
					setSelectedItemIds={setSelectedItemIds}
				/>
				<Button
					disabled={newItem === ''}
					onClick={appendNewItem}
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

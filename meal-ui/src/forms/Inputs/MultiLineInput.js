import { useState } from 'react';
import { TextInput } from './TextInput';
import { MultiSelectCustom } from './Multiselect';
import Button from 'components/Button';
import { objectMap } from 'utils';

// will set newly added item IDs to 'new-item'
export default function MultiLineInput({
	className,
	items,
	attrName,
	handler,
	placeholder
}) {
	const [newItem, setNewItem] = useState('');

	const selectionOptions = [
		{ id: 1, name: 'option A' },
		{ id: 2, name: 'option B' },
		{ id: 3, name: 'option C' }
	];

	const appendNewItem = () => {
		// by using a fake event, consumers can re-use existing form handlers that would expect event.target data
		handler({
			target: {
				id: 'new-item',
				name: 'recipeIngredients',
				value: newItem
			}
		});

		setNewItem('');
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
					label='choose ingredients'
					items={selectionOptions}
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
						handler={handler}
					/>
				))}
		</div>
	);
}

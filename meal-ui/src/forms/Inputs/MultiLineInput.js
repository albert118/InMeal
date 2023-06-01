import { useState } from 'react';
import { default as TextInput } from './TextInput';
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
					value={newItem}
					handler={event => setNewItem(event.target.value)}
					handleKeyDown={handleKeyDown}
					placeholder={placeholder}
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

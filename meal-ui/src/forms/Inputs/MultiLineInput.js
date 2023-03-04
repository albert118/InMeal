import { useState } from 'react';

import { TextInput } from './TextInput';
import Button from 'components/Button';

import { objectMap } from './objectMap';

// will set newly added item IDs to 'new-item'
export default function MultiLineInput({
	className,
	items,
	attrName,
	handler,
	placeholder
}) {
	const classes = className
		? `multi-line-input ${className}`
		: `multi-line-input`;

	const [newItem, setNewItem] = useState('');

	return (
		<div className={classes}>
			<div className='add-new-item'>
				{/* <TextInput
					className='new-ingredient'
					name='new-ingredient'
					value={newItem}
					handler={event => setNewItem(event.target.value)}
					placeholder={placeholder}
				/>
				<Button handler={appendNewItem}>➕</Button> */}
			</div>

			{objectMap(items, (key, value) => (
				<TextInput
					key={key}
					id={key}
					name={attrName}
					value={value.hasOwnProperty('label') ? value.label : value}
					handler={handler}
				/>
			))}
		</div>
	);
}

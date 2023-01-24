import React from 'react';
import { TextInput } from './TextInput';
import Button from 'components/Button';

export default function MultiLineInput(props) {
	const {
		className,
		items,
		newItem,
		newItemHandler,
		addNewItemHandler,
		placeholder
	} = props;

	const classes = className
		? `multi-line-input ${className}`
		: `multi-line-input`;

	return (
		<div className={classes}>
			{items.map(item =>
				item.hasOwnProperty('label') ? (
					<TextInput
						key={item.id}
						name={item.id}
						value={item.label}
					/>
				) : (
					<TextInput
						key={item.id ?? crypto.randomUUID()}
						name={item.id ?? crypto.randomUUID()}
						value={item}
					/>
				)
			)}

			<div className='add-new-item'>
				<TextInput
					className='new-ingredient'
					name='new-ingredient'
					value={newItem}
					handler={newItemHandler}
					placeholder={placeholder}
				/>
				<Button handler={addNewItemHandler}>➕</Button>
			</div>
		</div>
	);
}

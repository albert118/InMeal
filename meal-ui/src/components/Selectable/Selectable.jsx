import { useState } from 'react';

export default function Selectable({ onClick, ...additionalProps }) {
	const [isSelected, setIsSelected] = useState(
		additionalProps.selected ?? false
	);

	return (
		<div
			className={
				additionalProps.className
					? `${additionalProps.className} selectable-section`
					: 'selectable-section'
			}
			onClick={event => {
				setIsSelected(prev => !prev);
				onClick(event);
			}}
		>
			{additionalProps.children}
			<div
				className={`selectable-icon ${
					isSelected ? 'is-selected' : 'not-selected'
				}`}
			>
				{isSelected ? '✅' : '⚪'}
			</div>
		</div>
	);
}

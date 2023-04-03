import { ImageCard } from 'components/Card';
import { useState } from 'react';

export function RecipeCardCheckable({
	recipe,
	label,
	onClick,
	onCheck,
	...additionalProps
}) {
	const [isChecked, setIsChecked] = useState(false);

	const injectedClasses = additionalProps.className
		? `recipe-tile ${additionalProps.className}`
		: 'recipe-tile';

	return (
		<ImageCard
			key={additionalProps.key ?? recipe.id}
			id={recipe.id}
			className={
				isChecked
					? `cds--tile--is-selected ${injectedClasses}`
					: injectedClasses
			}
			label={label}
			status={recipe.status}
			ctaHandler={onClick}
			entityName='recipe'
		>
			<SelectableIcon isChecked={isChecked} />
			<img
				onClick={() => setIsChecked(prev => !prev)}
				src={recipe.image.url}
				alt={label}
			/>
		</ImageCard>
	);
}

function SelectableIcon({ isChecked }) {
	return (
		<span className='cds--tile__checkmark'>
			<svg
				focusable='false'
				preserveAspectRatio='xMidYMid meet'
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				aria-hidden={!isChecked}
			>
				<path d='M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z'></path>
				<path
					d='M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z'
					data-icon-path='inner-path'
					opacity={isChecked ? '1' : '0'}
				></path>
			</svg>
		</span>
	);
}

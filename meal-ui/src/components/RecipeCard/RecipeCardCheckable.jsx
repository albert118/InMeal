import { ImageCard } from 'components/Card';
// import { Checkbox } from 'forms/Inputs';
import { Checkbox } from 'carbon-components-react';

export function RecipeCardCheckable({
	recipe,
	label,
	onClick,
	onCheck,
	...additionalProps
}) {
	return (
		<ImageCard
			key={additionalProps.key ?? recipe.id}
			id={recipe.id}
			className={
				additionalProps.className
					? `recipe-tile ${additionalProps.className}`
					: 'recipe-tile'
			}
			label={label}
			status={recipe.status}
			ctaHandler={onClick}
			entityName='recipe'
		>
			<Checkbox
				id={additionalProps.key ?? `checkbox_${recipe.id}`}
				checked={false}
				onCheck={event => onCheck(recipe.id, event.target.checked)}
			/>
			<img
				src={recipe.image.url}
				alt={label}
			/>
		</ImageCard>
	);
}

import { ImageCard } from 'components/Card';
import Selectable from 'components/Selectable';

export function SelectableRecipeCard({
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
			<Selectable
				className='image-slot'
				onClick={isSelected => onCheck(recipe.id, isSelected)}
			>
				<img
					src={recipe.image.url}
					alt={label}
				/>
			</Selectable>
		</ImageCard>
	);
}

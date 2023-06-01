import { ImageCard } from 'components/Card';

export default function RecipeCard({
	recipe,
	label,
	onClick,
	...additionalProps
}) {
	return (
		<ImageCard
			key={additionalProps.key ?? recipe.id}
			id={recipe.id}
			className={additionalProps.className}
			label={label}
			ctaHandler={onClick}
			entityName='recipe'
		>
			<img
				src={recipe.image.url}
				alt={label}
			/>
		</ImageCard>
	);
}

import { ImageCard } from 'components/Card';

export function RecipeCard({ recipe, label, onClick, ...additionalProps }) {
	return (
		<ImageCard
			key={additionalProps.key ?? recipe.id}
			id={recipe.id}
			className={
				additionalProps.className
					? `${additionalProps.className} recipe-grid-content`
					: 'recipe-grid-content'
			}
			label={label}
			status={recipe.status}
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

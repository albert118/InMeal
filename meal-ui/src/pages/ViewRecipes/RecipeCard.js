import { ImageCard } from 'components/Card';

export function RecipeCard({ recipe }) {
	return (
		<ImageCard
			key={recipe.id}
			id={recipe.id}
			className='recipe-grid-content'
			label={recipe.content.title}
			status={recipe.status}
			ctaHandler={recipe.handler}
		>
			<img
				src={recipe.image.url}
				alt={recipe.label}
			/>
		</ImageCard>
	);
}

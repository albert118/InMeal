import { ImageCard } from 'components/Card';

export default function View({ recipes }) {
	console.log(recipes);
	if (!recipes) {
		return (
			<div className='p-recipe-view'>
				<div className='recipe-grid'></div>
			</div>
		);
	}

	return (
		<div className='p-recipe-view'>
			<div className='recipe-grid'>
				{recipes.map(r => (
					<RecipeCard recipe={r} />
				))}
			</div>
		</div>
	);
}

const RecipeCard = ({ recipe }) => {
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
};

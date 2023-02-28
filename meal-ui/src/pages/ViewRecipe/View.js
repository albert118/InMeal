import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';
import { demoImage } from 'DemoImage';

export default function View(props) {
	const { recipe, isLoading } = props;

	return (
		<div className='p-recipe-view'>
			<RecipeCard
				recipe={recipe}
				status={FormStatuses.Unknown}
				isLoading={isLoading}
			>
				<img
					src={demoImage.url}
					alt={recipe.title}
				/>
			</RecipeCard>
		</div>
	);
}

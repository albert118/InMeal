import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';
import { demoImage } from 'DemoImage';
import { HomeButton } from 'components/Button';

export default function View(props) {
	const { recipe } = props;

	return (
		<div className='p-recipe'>
			<div className='left-panel'>
				<HomeButton />
			</div>
			<RecipeCard
				recipe={recipe}
				status={FormStatuses.Unknown}
			>
				<img
					src={demoImage.url}
					alt={recipe.title}
				/>
			</RecipeCard>
		</div>
	);
}

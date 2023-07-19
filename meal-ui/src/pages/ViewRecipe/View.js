import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';
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
			/>
		</div>
	);
}

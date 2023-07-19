import { LeftPane, RightPane } from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from 'forms';
import { HomeButton } from 'components/Button';

export default function View(props) {
	const { recipe } = props;

	return (
		<div className='p-recipe'>
			{/* <div className='nav-actions'>
				<HomeButton />
			</div> */}
			<LeftPane
				recipe={recipe}
				status={FormStatuses.Unknown}
			/>
			<RightPane
				recipe={recipe}
				status={FormStatuses.Unknown}
			/>
		</div>
	);
}

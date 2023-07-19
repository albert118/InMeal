import { TwoPaneRecipeCard } from 'components';
import { HomeButton } from 'components/Button';

export default function View(props) {
	const { recipe } = props;

	return (
		<div className='p-recipe'>
			{/* <div className='nav-actions'>
				<HomeButton />
			</div> */}

			<TwoPaneRecipeCard recipe={recipe} />
		</div>
	);
}

import { TwoPaneRecipeCard } from 'components';

export default function View(props) {
	const { recipe } = props;

	return (
		<div className='p-recipe'>
			<TwoPaneRecipeCard recipe={recipe} />
		</div>
	);
}

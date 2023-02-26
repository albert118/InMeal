import { RecipeCard } from './RecipeCard';

export default function View({ recipes }) {
	return (
		<div className='p-page scrollbar-vertical'>
			<div className='recipe-grid'>
				{recipes.map(r => (
					<RecipeCard recipe={r} />
				))}
			</div>
		</div>
	);
}

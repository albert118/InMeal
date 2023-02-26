import { RecipeCard } from './RecipeCard';
import { GridHeader } from './GridHeader';

export default function View({ recipes }) {
	return (
		<div className='p-manage-recipes'>
			<ManageRecipesTable recipes={recipes} />
		</div>
	);
}

function ManageRecipesTable({ recipes }) {
	return (
		<div className='manage-recipes'>
			<GridHeader />
			<RecipeGrid recipes={recipes} />
		</div>
	);
}

function RecipeGrid({ recipes }) {
	return (
		<div className='recipes-grid scrollbar-vertical'>
			{recipes.map(r => (
				<RecipeCard recipe={r} />
			))}
		</div>
	);
}

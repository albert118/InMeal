import { RecipeCard } from './RecipeCard';

export default function View({ recipes }) {
	return (
		<div className='p-manage-recipes'>
			<ManageRecipesTable recipes={recipes} />
		</div>
	);
}

function ManageRecipesTable({ recipes }) {
	//
	return (
		<div className='manage-recipes'>
			<div className='grid-header font-white-header'>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>

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

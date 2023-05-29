import { SelectableRecipeCard } from 'components/RecipeCard';

export function RecipeGrid({ recipes, addOrRemoveSelectedItem }) {
	return (
		<div className='recipes-grid'>
			{recipes.map(recipe => (
				<SelectableRecipeCard
					key={recipe.id}
					className='recipe-grid-tile'
					recipe={recipe}
					label={recipe.content.title}
					onClick={recipe.handler}
					onCheck={addOrRemoveSelectedItem}
				/>
			))}
		</div>
	);
}

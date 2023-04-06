import { SelectableRecipeCard } from 'components/RecipeCard';

export function RecipeGrid({ recipes, addOrRemoveSelectedItem }) {
	return (
		<div className='recipes-grid'>
			{recipes.map(recipe => (
				<SelectableRecipeCard
					recipe={recipe}
					label={recipe.content.title}
					onClick={recipe.handler}
					onCheck={addOrRemoveSelectedItem}
				/>
			))}
		</div>
	);
}

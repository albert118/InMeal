import { RecipeCardCheckable } from 'components/RecipeCard/RecipeCardCheckable';

export function RecipeGrid({ recipes, addOrRemoveSelectedItem }) {
	return (
		<div className='recipes-grid scrollbar-vertical'>
			{recipes.map(recipe => (
				<RecipeCardCheckable
					recipe={recipe}
					className='grid-tile'
					label={recipe.content.title}
					onClick={recipe.handler}
					onCheck={addOrRemoveSelectedItem}
				/>
			))}
		</div>
	);
}

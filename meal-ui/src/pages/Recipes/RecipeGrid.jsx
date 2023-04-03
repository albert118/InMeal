import { GridTile } from './GridTile';

export function RecipeGrid({ recipes, addOrRemoveSelectedItem }) {
	return (
		<div className='recipes-grid scrollbar-vertical'>
			{recipes.map(recipe => (
				<GridTile
					item={recipe}
					gridHandler={addOrRemoveSelectedItem}
				/>
			))}
		</div>
	);
}

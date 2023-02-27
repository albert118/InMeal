import { RecipeCard } from './RecipeCard';
import { Checkbox } from 'forms/Inputs';

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

export function GridTile({ item, gridHandler }) {
	const handleCheckboxToggle = event => {
		gridHandler(item.id, event.target.checked);
	};

	return (
		<div className='grid-tile'>
			<Checkbox
				key={`checkbox_${item.id}`}
				value={false}
				handler={handleCheckboxToggle}
			/>
			<RecipeCard
				key={`recipecard_${item.id}`}
				recipe={item}
			/>
		</div>
	);
}

import { RecipeCard } from 'components/RecipeCard';
import { Checkbox } from 'forms/Inputs';

export function GridTile({ item, gridHandler }) {
	return (
		<div className='grid-tile'>
			<Checkbox
				key={`checkbox_${item.id}`}
				value={false}
				handler={event => gridHandler(item.id, event.target.checked)}
			/>
			<RecipeCard
				key={`recipecard_${item.id}`}
				recipe={item}
				label={item.title}
				onClick={item.handler}
			/>
		</div>
	);
}

import { IngredientsIndexRow } from './components';
import { objectMap } from 'utils';

export default function View({ indexedIngredients, refreshData }) {
	const clicker = ingredientId => console.log(`clicked ${ingredientId}!`);

	return (
		<div className='p-ingredients'>
			<h2>
				Ingredients
				<label>Manage your pantry's ingredients</label>
			</h2>

			{objectMap(indexedIngredients, (idx, ingredients) => {
				return (
					<IngredientsIndexRow
						key={idx}
						label={idx}
						ingredients={ingredients}
						onClick={clicker}
						refreshData={refreshData}
					/>
				);
			})}
		</div>
	);
}

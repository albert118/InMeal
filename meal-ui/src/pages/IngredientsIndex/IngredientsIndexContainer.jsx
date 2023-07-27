import { useAlphabeticallyIndexedIngredients, useMeasurements } from 'hooks/data';
import { IngredientsIndexRow } from './components';
import { objectMap } from 'utils';

export default function IngredientsIndexContainer() {
	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();
	const { measurementOptions } = useMeasurements();

	console.log(measurementOptions);

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
						refreshData={refreshData}
						measurementOptions={measurementOptions}
					/>
				);
			})}
		</div>
	);
}

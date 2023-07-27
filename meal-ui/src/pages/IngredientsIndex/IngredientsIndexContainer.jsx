import { useAlphabeticallyIndexedIngredients, useMeasurements } from 'hooks/data';
import View from './View';

export default function IngredientsIndexContainer() {
	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();
	const { measurementOptions } = useMeasurements();

	return (
		<View
			indexedIngredients={indexedIngredients}
			refreshData={refreshData}
		/>
	);
}

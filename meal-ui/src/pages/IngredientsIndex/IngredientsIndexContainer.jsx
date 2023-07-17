import { useAlphabeticallyIndexedIngredients } from 'hooks/data';
import View from './View';

export default function IngredientsIndexContainer() {
	const { indexedIngredients, refreshData } = useAlphabeticallyIndexedIngredients();

	return (
		<View
			indexedIngredients={indexedIngredients}
			refreshData={refreshData}
		/>
	);
}

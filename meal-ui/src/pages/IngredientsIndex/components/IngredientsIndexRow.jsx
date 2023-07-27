import { IndexRow } from 'components';
import { IngredientsModalBadge } from '../forms/IngredientsModalBadge';

export default function IngredientsIndexRow({ label, ingredients, refreshData }) {
	return (
		<IndexRow label={label}>
			{ingredients.map(ingredient => (
				<IngredientsModalBadge
					key={ingredient.ingredientId}
					ingredient={ingredient}
					refreshData={refreshData}
				/>
			))}
		</IndexRow>
	);
}

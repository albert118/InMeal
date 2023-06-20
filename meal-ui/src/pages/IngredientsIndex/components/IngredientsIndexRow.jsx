import { IndexRow } from 'components';
import { IngredientsModalBadge } from '../forms/IngredientsModalBadge';

export default function IngredientsIndexRow({ label, ingredients, refreshData }) {
	return (
		<IndexRow label={label}>
			{ingredients.map(ingredient => {
				return (
					<IngredientsModalBadge
						key={ingredient.id}
						ingredient={ingredient}
						refreshData={refreshData}
					/>
				);
			})}
		</IndexRow>
	);
}

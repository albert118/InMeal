import { IndexRow } from 'components';
import { IngredientsModalBadge } from 'forms/EditIngredient';

export default function IngredientsIndexRow({
	label,
	ingredients,
	refreshData,
	measurementOptions
}) {
	return (
		<IndexRow label={label}>
			{ingredients.map(ingredient => (
				<IngredientsModalBadge
					key={ingredient.ingredientId}
					ingredient={ingredient}
					refreshData={refreshData}
					measurementOptions={measurementOptions}
				/>
			))}
		</IndexRow>
	);
}

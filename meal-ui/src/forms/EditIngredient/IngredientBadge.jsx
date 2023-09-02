import { Badge } from 'components';

export default function IngredientBadge({ ingredientName, recipeUsagesCount, onClick }) {
	const isUsed = recipeUsagesCount && recipeUsagesCount > 0;
	const labelText = isUsed ? `${recipeUsagesCount} recipes` : 'unused ingredient';

	return (
		<Badge
			text={ingredientName}
			labelText={labelText}
			isWarning={!isUsed}
			onClick={onClick}
		/>
	);
}

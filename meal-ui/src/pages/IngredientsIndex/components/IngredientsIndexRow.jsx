import { IndexRow, HorizontalCard } from 'components';
import { IngredientsModalBadge } from 'forms/EditIngredient';

export default function IngredientsIndexRow({
	label,
	ingredients,
	refreshData,
	measurementOptions,
	isSelected,
	onAddOrRemove
}) {
	return (
		<IndexRow label={label}>
			{ingredients.map(ingredient => (
				<HorizontalCard
					key={ingredient.id}
					title={ingredient.name}
					entityName='ingredient'
					onClick={() => onAddOrRemove(ingredient)}
					onAction={() => console.log('action!')}
					onActionText='edit'
					selected={isSelected(ingredient)}
				>
					<IngredientsModalBadge
						key={ingredient.ingredientId}
						ingredient={ingredient}
						refreshData={refreshData}
						measurementOptions={measurementOptions}
					/>
				</HorizontalCard>
			))}
		</IndexRow>
	);
}

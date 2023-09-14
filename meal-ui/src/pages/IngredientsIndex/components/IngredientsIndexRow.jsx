import { Badge, IndexRow, HorizontalCard } from 'components';
import { EditIngredientsModal } from 'forms/EditIngredient';

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
					onAction={
						<EditIngredientsModal
							key={ingredient.ingredientId}
							ingredient={ingredient}
							refreshData={refreshData}
							measurementOptions={measurementOptions}
						/>
					}
					selected={isSelected(ingredient)}
				>
					<IngredientDetailBadges ingredient={ingredient} />
				</HorizontalCard>
			))}
		</IndexRow>
	);
}

function IngredientDetailBadges({ ingredient }) {
	const onBadgeClick = () => console.log('clicked badge');

	const isUsed = ingredient.recipeUsageCount && ingredient.recipeUsageCount > 0;

	return (
		<div className='tiled-badges'>
			<div className='tiled-badges__row'>
				<Badge
					text={isUsed ? `used in ${ingredient.recipeUsageCount} recipes` : 'unused'}
					labelText={!isUsed ? 'available for deletion' : ''}
					isWarning={!isUsed}
					onClick={onBadgeClick}
				/>
				<Badge
					text='measurement'
					labelText={ingredient.units.name}
					onClick={onBadgeClick}
				/>
			</div>
		</div>
	);
}

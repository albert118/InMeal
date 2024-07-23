import { Badge, HorizontalCard, IndexRow } from '../../../components';
import AppRoutes from '../../../navigation/AppRoutes';

export default function IngredientsIndexRow({
    label,
    ingredients,
    isSelected,
    onAddOrRemove
}) {
    return (
        <IndexRow label={label}>
            {ingredients.map(ingredient => (
                <HorizontalCard
                    key={ingredient.ingredientId}
                    title={ingredient.name}
                    entityName='Edit ingredient'
                    navigateLocation={`${AppRoutes.ingredients}/edit/${ingredient.ingredientId}`}
                    onClick={() => onAddOrRemove(ingredient)}
                    selected={isSelected(ingredient)}
                    image={{
                        url: ingredient.image.url,
                        label: ingredient.name
                    }}
                >
                    <IngredientDetailBadges ingredient={ingredient} />
                </HorizontalCard>
            ))}
        </IndexRow>
    );
}

function IngredientDetailBadges({ ingredient }) {
    const onBadgeClick = () => console.log('clicked badge');

    const isUsed =
        ingredient.recipeUsageCount && ingredient.recipeUsageCount > 0;

    return (
        <div className='tiled-badges'>
            <div className='tiled-badges__row'>
                <Badge
                    text={
                        isUsed
                            ? `${ingredient.recipeUsageCount} recipes`
                            : 'unused'
                    }
                    labelText={!isUsed ? 'available for deletion' : ''}
                    isWarning={!isUsed}
                    onClick={onBadgeClick}
                />
                {ingredient.units.name !== 'unknown' && (
                    <Badge
                        text={ingredient.units.name}
                        onClick={onBadgeClick}
                    />
                )}
            </div>
        </div>
    );
}

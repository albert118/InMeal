import { Badge, HorizontalCard, IndexRow } from '../../components';
import AppRoutes from '../../navigation/AppRoutes';
import { stringifyType } from '../../utils';

export default function ManageRecipesRow({
    label,
    recipes,
    isSelected,
    onAddOrRemove
}) {
    return (
        <IndexRow label={label}>
            {recipes.map(recipe => {
                return (
                    <HorizontalCard
                        key={recipe.id}
                        title={recipe.title}
                        entityName='Edit recipe'
                        navigateLocation={`${AppRoutes.recipe}/${recipe.id}`}
                        onClick={() => onAddOrRemove(recipe)}
                        selected={isSelected(recipe)}
                        image={{
                            url: recipe.image.url,
                            label: recipe.image.title
                        }}
                    >
                        <RecipeDetailBadges recipe={recipe} />
                    </HorizontalCard>
                );
            })}
        </IndexRow>
    );
}

function RecipeDetailBadges({ recipe }) {
    const onBadgeClick = () => console.log('clicked badge');

    const isUnknown = val => val?.toLowerCase() === 'unknown';

    return (
        <div className='tiled-badges'>
            <div className='tiled-badges__row'>
                {!isUnknown(recipe.course) && (
                    <Badge
                        text={stringifyType(recipe.course)}
                        labelText='course'
                        onClick={onBadgeClick}
                    />
                )}
                {!isUnknown(recipe.category) && (
                    <Badge
                        text={stringifyType(recipe.category)}
                        labelText='cuisine'
                        onClick={onBadgeClick}
                    />
                )}
                {!isUnknown(recipe.type) && (
                    <Badge
                        text={stringifyType(recipe.type)}
                        labelText='type'
                        onClick={onBadgeClick}
                    />
                )}
            </div>
            <div className='tiled-badges__row'>
                {recipe.servings > 0 && (
                    <Badge
                        text={`${recipe.servings} servings`}
                        onClick={onBadgeClick}
                    />
                )}
                {recipe.ingredientsCount > 0 && (
                    <Badge
                        text={`${recipe.ingredientsCount} ingredients`}
                        onClick={onBadgeClick}
                    />
                )}
            </div>
        </div>
    );
}

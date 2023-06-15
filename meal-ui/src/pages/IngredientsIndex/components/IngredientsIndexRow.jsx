import IngredientBadge from './IngredientsBadge';
import { IndexRow } from 'components';

export default function IngredientsIndexRow({ label, ingredients }) {
    return (
        <IndexRow label={label}>
            {
                ingredients.map(ingredient => {
                    return <IngredientBadge
                        ingredientName={ingredient.name}
                        recipeUsagesCount={ingredient.count}
                        onClick={() => console.log('click!')}
                    />
                })
            }
        </IndexRow>
    );
}
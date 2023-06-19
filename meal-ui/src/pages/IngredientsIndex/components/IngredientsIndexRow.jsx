import IngredientBadge from './IngredientsBadge';
import { IndexRow } from 'components';

export default function IngredientsIndexRow({ label, ingredients, onClick }) {
    return (
        <IndexRow label={label}>
            {
                ingredients.map(ingredient => {
                    return ( 
                        <IngredientBadge
                            key={ingredient.id}
                            ingredientName={ingredient.name}
                            recipeUsagesCount={ingredient.recipeUsageCount}
                            onClick={() => onClick(ingredient.id)}
                        />
                    )
                })
            }
        </IndexRow>
    );
}
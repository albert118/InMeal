import IngredientBadge from './IngredientsBadge';
import { IndexRow } from 'components';

export default function IngredientsIndexRow({ label, ingredients, onClick }) {
    return (
        <IndexRow label={label}>
            {
                ingredients.map(ingredient => {
                    return ( 
                        <IngredientBadge
                            key={ingredient.Id}
                            ingredientName={ingredient.Name}
                            recipeUsagesCount={ingredient.RecipeUsageCount}
                            onClick={() => onClick(ingredient.Id)}
                        />
                    )
                })
            }
        </IndexRow>
    );
}
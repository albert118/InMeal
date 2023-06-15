import { IngredientBadge } from './components';

export default function View({ ingredients }) {
    return (
        <div className="simple-container">
            {ingredients.map(sample => {
                return <IngredientBadge
                    ingredientName={sample.name}
                    recipeUsagesCount={sample.count}
                    onClick={() => console.log('click!')}
                />
            })}
        </div>
    );
}

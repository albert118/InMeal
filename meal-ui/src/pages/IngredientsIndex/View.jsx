import { IngredientBadge } from './components';

export default function View() {
    const sampleIngredients = [
        { name: 'salt', count: 7 },
        { name: 'green onion', count: 7 },
        { name: 'shallots', count: 7 },
        { name: 'eggs', count: null },
        { name: 'butter', count: 0 },
    ];

    return (
        <div className="simple-container">
            {sampleIngredients.map(sample => {
                return <IngredientBadge
                    ingredientName={sample.name}
                    recipeUsagesCount={sample.count}
                    onClick={() => console.log('click!')}
                />
            })}
        </div>
    );
}

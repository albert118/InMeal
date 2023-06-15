
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

function IngredientBadge({ ingredientName, recipeUsagesCount, onClick }) {
    const isUsed = recipeUsagesCount && recipeUsagesCount > 0;
    const labelText = isUsed ? `${recipeUsagesCount} recipes` : 'unused ingredient';

    return (
        <div className="badge" onClick={onClick}>
            <a>{ingredientName}</a>
            <label className={ isUsed ? '': 'unused'}>{labelText}</label>
        </div>
    );
}
import { IngredientsIndexRow } from './components';
import { objectMap } from 'utils';

// TODO: wrap index rows into a container with divider styling and flesh 
// out the index label
// TODO: onClick modal
// TODO: load real data (extend API to return the keyed dictionary)
export default function View({ indexedIngredients }) {
    return (
        <div className="p-ingredients">
            <h2>
                Ingredients
                <label>Manage your pantry's ingredients</label>
            </h2>
            
            {objectMap(indexedIngredients, (idx, ingredients) => {
                return <IngredientsIndexRow key={idx} label={idx} ingredients={ingredients}/>
            })}
        </div>
    );
}

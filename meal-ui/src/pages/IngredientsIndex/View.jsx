import { IngredientsIndexRow } from './components';
import { objectMap } from 'utils';

export default function View({ indexedIngredients }) {
    return (
        <div className="simple-container">
            {objectMap(indexedIngredients, (idx, ingredients) => {
                return <IngredientsIndexRow key={idx} label={idx} ingredients={ingredients}/>
            })}
        </div>
    );
}

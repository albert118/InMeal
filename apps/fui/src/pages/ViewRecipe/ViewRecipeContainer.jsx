import { useParams } from 'react-router-dom';
import { useRecipe } from '../../hooks/data';
import { TwoPaneRecipeCard } from '../../components';

export default function ViewRecipeContainer() {
    const { recipeId } = useParams();
    const { recipe } = useRecipe(recipeId);

    return (
        <div className='p-recipe'>
            <TwoPaneRecipeCard recipe={recipe} />
        </div>
    );
}

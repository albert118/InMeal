import { Image, TitleBar } from '../../components';
import { NumberInput, TextInput } from '../../forms/Inputs';
import { Actions } from './Actions';
import { RecipeIngredients } from './RecipeIngredients';
import { useRecipeImage } from '../../hooks/data';

export default function TwoPaneRecipeCard({ recipe }) {
    return (
        <div className='two-pane-recipe-card'>
            <LeftPane recipe={recipe} />
            <RightPane recipe={recipe} />
        </div>
    );
}

function LeftPane({ recipe }) {
    // TODO: this should be phased out once the real content can be loaded
    const { getRecipeImage } = useRecipeImage();
    const recipeImage = getRecipeImage(null);

    return (
        <div className='card recipe-card two-pane-recipe-card--left'>
            <Image
                alt={recipe.title}
                className='image-slot'
                url={recipeImage.url}
            />

            <TitleBar>{recipe.title}</TitleBar>

            <div className='recipe-card__data scrollbar-vertical'>
                <p className='recipe-data__blurb'>{recipe.blurb}</p>
                <RecipeIngredients
                    recipeIngredients={recipe.recipeIngredients}
                />
            </div>
        </div>
    );
}

function RightPane({ recipe }) {
    return (
        <div className='card recipe-card two-pane-recipe-card--right'>
            <div className='recipe-card__data scrollbar-vertical'>
                <div className='recipe-data__meta'>
                    <div className='meta-row'>
                        <TextInput
                            label='category'
                            value={recipe.category}
                            disabled={true}
                        />
                        <NumberInput
                            value={recipe.servings}
                            label='servings'
                            disabled={true}
                        />
                    </div>
                    <div className='meta-row'>
                        <TextInput
                            label='meal type'
                            value={recipe.type}
                            disabled={true}
                        />
                        <NumberInput
                            value={recipe.prepTime}
                            label='preparation time (minutes)'
                            disabled={true}
                        />
                    </div>
                    <div className='meta-row'>
                        <TextInput
                            label='course'
                            value={recipe.course}
                            disabled={true}
                        />

                        <NumberInput
                            value={recipe.cookTime}
                            label='cook time (minutes)'
                            disabled={true}
                        />
                    </div>
                </div>
                <p className='recipe__steps'>{recipe.preparationSteps}</p>
            </div>
            <Actions className='recipe-card__actions' recipeId={recipe.id} />
        </div>
    );
}

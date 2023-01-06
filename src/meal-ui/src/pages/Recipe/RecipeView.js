import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import RecipeCard from './components/RecipeCard';

const newDataSource = idx => {
    return {
        title: `Turkish Deluxe - ${idx}`,
        blurb: "ggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshas",
        recipeIngredients: [ {label: "uno" }, {label: "dos" }, {label: "tres" }],
        preparationSteps: [ {label: "uno" }, {label: "dos" }, {label: "tres" }],
        image: {
            label: `This is content- ${idx}`,
            url: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif"
        }
    };
};


export default function RecipeView() {
    const genericContext = useContext(GenericContext);

    const testRecipes = [
        newDataSource(1),
        newDataSource(2),
        newDataSource(3)
    ];

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <div className="recipe-list">
                    { testRecipes.map(recipe => 
                        <RecipeCard recipe={recipe}>
                            <img src={recipe.image.url} alt={recipe.image.label} />
                        </RecipeCard>
                    )}
                </div>
            </div>
        );
};

import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import RecipeCard from './components/RecipeCard';


export default function RecipeView() {
    const genericContext = useContext(GenericContext);

    const item = {
        label: "This is content",
        imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif"
    };

    const testRecipe = {
        title: "Turkish Deluxe",
        blurb: "xtra+ Turkish",
        recipeIngredients: "* uno\n*dos\n*tres",
        preparationSteps: "1. uno\n2.dos\n3.tres",
    };

    const classes = genericContext.className 
        ? `p-recipe-view recipe ${genericContext.className}` 
        : `p-recipe-view recipe`;

        return(
            <div className={classes}>
                <RecipeCard recipe={testRecipe}>
                    <img src={item.imgUrl} alt={item.label} />
                </RecipeCard>
            </div>
        );
};

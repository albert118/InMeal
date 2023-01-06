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
        blurb: "ggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshasggusdhgouadshas",
        recipeIngredients: [ {label: "uno" }, {label: "dos" }, {label: "tres" }],
        preparationSteps: [ {label: "uno" }, {label: "dos" }, {label: "tres" }]
    };

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <RecipeCard recipe={testRecipe}>
                    <img src={item.imgUrl} alt={item.label} />
                </RecipeCard>
            </div>
        );
};

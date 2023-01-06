import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { useParams } from "react-router-dom";
import RecipeCard from 'pages/ViewRecipe/RecipeCard';


const newDataSource = idx => {
    return {
        id: idx,
        title: `Turkish Deluxe - ${idx}`,
        status: "unprepared",
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
    const { recipeId } = useParams();
    const testRecipe = newDataSource(recipeId);

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <RecipeCard recipe={testRecipe}>
                    <img src={testRecipe.image.url} alt={testRecipe.title} />
                </RecipeCard>
            </div>
        );
};

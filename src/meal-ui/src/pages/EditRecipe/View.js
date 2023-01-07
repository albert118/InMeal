import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { useParams } from "react-router-dom";
import RecipeCard from 'pages/ViewRecipe/RecipeCard';


export default function View() {
    const genericContext = useContext(GenericContext);
    const { recipeId } = useParams();

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

    const demoRecipe = {
        id: recipeId,
        title: "New recipe",
        status: "unsaved",
        blurb: "no details",
        recipeIngredients: [],
        preparationSteps: [],
        image: {
            label: "no alt.",
            url: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif"
        }
    }

    return(
        <div className={classes}>
            <RecipeCard recipe={demoRecipe}>
                <img src={demoRecipe.image.url} alt={demoRecipe.image.label} />
            </RecipeCard>
        </div>
    );

};

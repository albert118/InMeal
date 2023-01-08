import React, { useContext, useState, useEffect, useCallback } from "react";
import { GenericContext } from 'pages/GenericPageContainer';
import { useParams } from "react-router-dom";
import useFetch from 'use-http';
import RecipeCard from 'pages/ViewRecipe/RecipeCard';
import { FormStatuses } from "forms";


const demoImage = {
    label: null,
    url: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif"
};

export default function View() {
    const genericContext = useContext(GenericContext);
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});
    const { get, response, error, loading } = useFetch({ data: {}});

    const loadData = useCallback(async () => {
        const loadedRecipe = await get(`/recipe?id=${encodeURIComponent(recipeId)}`);
        if (response.ok) setRecipe(loadedRecipe);
    }, [get, response]);

    useEffect(() => { loadData() }, [loadData]);

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <RecipeCard recipe={recipe} status={FormStatuses.Unknown} isLoading={loading}>
                    <img src={demoImage.url} alt={recipe.title} />
                </RecipeCard>
            </div>
        );
};

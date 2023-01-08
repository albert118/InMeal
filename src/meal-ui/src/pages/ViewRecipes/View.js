import React, { useContext, useEffect, useState, useCallback } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { ImageCard } from 'components/Card';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';
import useFetch from 'use-http';
import { FormStatuses } from "forms";

const demoImage = {
    label: null,
    url: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif"
};

const recipeIds = [
    "2b271329-83dc-4123-be11-f1ac96873868",
    "4cf33993-777f-497d-b007-4f2e333e2dca",
    "918e8444-db04-452d-a40d-295039fbdf93",
    "c24e6841-c919-4c49-b283-2d10697216f6",
    "ea7ca771-889c-4e53-ae88-e2b11a2c20ee"
];



export default function View() {
    const genericContext = useContext(GenericContext);
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const { post, response, error, loading } = useFetch({ data: []});

    const loadData = useCallback(async () => {
        const loadedRecipes = await post('/recipes', recipeIds);
        if (response.ok) setRecipes(loadedRecipes.map(mapForDisplay));
    }, [post, response]);
    

    useEffect(() => { loadData() }, [loadData]);

    const handleViewRecipeClick = id => navigate(`${AppRoutes.recipe}/${id}`);

    // inject handler, display status, etc.
    // TODO handle image, label, status
    const mapForDisplay = recipe => {
        return {
            id: recipe.id,
            content: recipe,
            label: "Breakfast",
            status: FormStatuses.Unknown,
            handler: handleViewRecipeClick,
            image: demoImage 
        }
    };

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <div className="recipe-grid">
                    { loading 
                        ? 'loading...'
                        : recipes.map(r => 
                            <ImageCard 
                                key={r.id}
                                id={r.id}
                                className="recipe-grid-content" 
                                label={r.content.title} status={r.status} 
                                ctaHandler={r.handler}
                            >
                                <img src={r.image.url} alt={r.label} />
                            </ImageCard>
                        )
                    }
                </div>
            </div>
        );
};

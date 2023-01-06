import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { ImageCard } from 'components/Card';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';


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
    const navigate = useNavigate();

    const handleViewRecipeClick = id => navigate(`${AppRoutes.editRecipe}/${id}`);

    // mock some test data
    const indexes = Array.from(Array(15).keys());
    const testRecipes = indexes.map(newDataSource);

    const classes = genericContext.className 
        ? `p-recipe-view ${genericContext.className}` 
        : `p-recipe-view`;

        return(
            <div className={classes}>
                <div className="recipe-grid">
                    { testRecipes.map(recipe => 
                        <ImageCard 
                            key={recipe.id}
                            id={recipe.id}
                            className="recipe-grid-content" 
                            label={recipe.title} status={recipe.status} 
                            ctaHandler={handleViewRecipeClick}
                        >
                            <img src={recipe.image.url} alt={recipe.label} />
                        </ImageCard>
                    )}
                </div>
            </div>
        );
};

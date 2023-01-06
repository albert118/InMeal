import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import AppRoutes from "navigation/AppRoutes";


const RecipeCard = props => {
    const { className, recipe } = props;
    
    const classes = className ? `recipe-card ${className}` : `recipe-card`;

    const navigate = useNavigate();

    const handleEditClick = () => navigate(AppRoutes.editRecipes);

    const handleTodoClick = () => {
        return null;
    };

    return(
        <div className={classes}>
            <div className="image-slot">
                {/* TODO: add recipe images and include here */}
                {props.children}
            </div>
            <div className="title-bar">
                <h2>{recipe.title}</h2>
                <Button handler={handleTodoClick}>
                    todo
                </Button>
            </div>                
            <div className="recipe-data-slot">
                <p>{recipe.blurb}</p>
                <br />
                <div className="detail-slot">
                    <div>{recipe.recipeIngredients}</div>
                    <div>{recipe.preparationSteps}</div>
                </div>
            </div>
            <div className="form-action-container">
                <Button handler={handleEditClick}>
                    edit
                </Button>
            </div>
        </div>
    );
};

export default RecipeCard;

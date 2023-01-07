import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import AppRoutes from "navigation/AppRoutes";
import TitleBar from "components/TitleBar/TitleBar";
import { Checkbox } from "forms/Inputs";

const RecipeCard = props => {
    const { className, recipe } = props;
    
    const classes = className 
        ? `recipe-card ${className}` 
        : `recipe-card`;

    const navigate = useNavigate();

    const handleEditClick = () => navigate(`${AppRoutes.recipe}/edit/${recipe.id}`);

    const handleTodoClick = () => {
        return null;
    };

    return(
        <div className={classes}>
            <div className="image-slot">
                {/* TODO: add recipe images and include here */}
                {props.children}
            </div>
            
            <TitleBar handler={handleTodoClick} btnText={"todo"}>
                {recipe.title}
            </TitleBar>

            <div className="recipe-data-slot recipe-content-grid">
                <p className="recipe-content-blurb">{recipe.blurb}</p>
                <div className="recipe-content-ingredients">
                    { recipe.recipeIngredients.map(ingredient => 
                        <Checkbox label={ingredient.label} value={false} />
                    )}
                </div>
                <ol type="1" className="recipe-content-preparation-steps simple-numbered-list">
                    { recipe.preparationSteps.map(step => 
                        <li>{step.label}</li>
                    )}
                </ol>
            </div>
            <div className="action-container">
                <Button handler={handleEditClick}>
                    edit
                </Button>
            </div>
        </div>
    );
};

export default RecipeCard;

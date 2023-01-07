import React, { useState } from "react";
import { CancelButton, SaveButton } from "forms/FormActions";
import FormContainer from "forms/FormContainer";
import { TextInput, LongTextInput } from "forms/Inputs";
import TitleBar from "components/TitleBar/TitleBar";
import StatusBadge from "components/StatusBadge";
import { FormStatuses } from "forms";
import AppRoutes from "navigation/AppRoutes";
import { useNavigate } from "react-router-dom";

const EditRecipeCardForm = props => {
    const { recipeId } = props;
    
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        id: recipeId,
        title: '',
        status: FormStatuses.Saved,
        blurb: '',
        recipeIngredients: [],
        preparationSteps: [],
        image: {
            label: null,
            url: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif"
        }
    });

    const handleChange = (event) => {
        setRecipe({ ...recipe, [event.target.name]: event.target.value });
    };

    const handleCancel = event => {
        event.preventDefault();

        setRecipe({
            id: recipeId,
            title: '',
            status: FormStatuses.Unsaved,
            blurb: '',
            recipeIngredients: [],
            preparationSteps: [],
            image: {
                label: null,
                url: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif"
            }
        });
    };

    const handleSave = event => {
        event.preventDefault();

        navigate(`${AppRoutes.recipe}/${recipe.id}`);
    };

    return(
        // TODO steal the recipe card style for now
        <FormContainer className="recipe-form-card">
            <div className="image-slot">
                {/* TODO: add recipe images and include edit functionality here (include dummy image for now) */}
                <img src={recipe.image.url} alt={recipe.image.label} />
                <StatusBadge className="e-image-status-badge" status={recipe.status} />
            </div>

            <TitleBar>
                <TextInput 
                    name={"title"} 
                    value={recipe.title} 
                    placeholder="Add a descriptive title, something other than Recipe #1" 
                    handler={handleChange} 
                />
            </TitleBar>

            <div className="recipe-data-slot recipe-content-grid">
                <LongTextInput className="recipe-content-blurb" name={"blurb"} value={recipe.blurb} placeholder="Maybe some details too?" handler={handleChange} />
                
                <LongTextInput 
                    className="recipe-content-ingredients" 
                    name={"recipeIngredients"} 
                    value={recipe.recipeIngredients} 
                    placeholder="What ingredients do you need?" 
                    handler={handleChange} 
                />

                <LongTextInput 
                    className="recipe-content-preparation-steps" 
                    name={"preparationSteps"} 
                    value={recipe.preparationSteps} 
                    placeholder="Include the steps to make this recipe" 
                    handler={handleChange} 
                />
            </div>
            <div className="action-container">
                <CancelButton handler={handleCancel} />
                <SaveButton handler={handleSave}>
                    save and complete
                </SaveButton>
            </div>

        </FormContainer>
    );
};

export { EditRecipeCardForm };
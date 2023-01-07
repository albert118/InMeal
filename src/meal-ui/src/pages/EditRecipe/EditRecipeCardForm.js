import React, { useState } from "react";
import { CancelButton, SaveButton } from "forms/FormActions";
import FormContainer from "forms/FormContainer";
import { Checkbox } from "forms/Inputs";
import { TextInput, LongTextInput } from "forms/Inputs";
import TitleBar from "components/TitleBar/TitleBar";

const EditRecipeCardForm = props => {
    const { recipeId } = props;

    const [recipe, setRecipe] = useState({
        id: recipeId,
        title: '',
        status: "unsaved",
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
        console.log("cancelled");
        setRecipe({
            id: recipeId,
            title: '',
            status: "unsaved",
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
        // event.preventDefault();
        console.log("saved - now cancelling for demo");
        handleCancel(event);
    };

    return(
        // TODO steal the recipe card style for now
        <FormContainer className="recipe-card">
            <div className="image-slot">
                {/* TODO: add recipe images and include edit functionality here (include dummy image for now) */}
                <img src={recipe.image.url} alt={recipe.image.label} />
            </div>

            <TitleBar>
                <TextInput name={"title"} value={recipe.title} placeholder="add a new title" handler={handleChange} />
            </TitleBar>

            <div className="recipe-data-slot recipe-content-grid">
                <LongTextInput className="recipe-content-blurb" name={"blurb"} value={recipe.blurb} placeholder="add some details" handler={handleChange} />
                <div className="recipe-content-ingredients">
                    {/* { recipe.recipeIngredients.map(ingredient => 
                        <Checkbox label={ingredient.label} value={false} />
                    )} */}
                </div>
                <ol type="1" className="recipe-content-preparation-steps simple-numbered-list">
                    {/* { recipe.preparationSteps.map(step => 
                        <li>{step.label}</li>
                    )} */}
                </ol>
            </div>
            <div className="action-container">
                <CancelButton handler={handleCancel} />
                <SaveButton handler={handleSave} />
            </div>

        </FormContainer>
    );
};

export { EditRecipeCardForm };
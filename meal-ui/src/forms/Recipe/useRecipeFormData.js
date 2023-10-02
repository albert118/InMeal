import { FormStatuses } from 'forms';
import { ErrorDetailContext, useRecipe, useRecipeMeta } from 'hooks/data';
import { useRecipeIngredients } from 'hooks/services';
import AppRoutes from 'navigation/AppRoutes';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultRecipe } from 'types/DefaultRecipe';

export default function useRecipeFormData() {
    const { recipeId } = useParams();

    const isAdd = !!!recipeId;

    const {
        postEditedRecipe,
        postRecipe,
        recipe: existingRecipe
    } = useRecipe(recipeId);
    const { meta } = useRecipeMeta();

    const [recipe, setRecipe] = useState(existingRecipe ?? defaultRecipe);
    const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

    const { error } = useContext(ErrorDetailContext);

    const navigate = useNavigate();

    const { handleRecipeIngredients } = useRecipeIngredients();

    useEffect(() => {
        setRecipe(existingRecipe);
    }, [existingRecipe]);

    useEffect(() => {
        setFormStatus(error ? FormStatuses.Error : FormStatuses.Saved);
    }, [error]);

    function onUpdate(event) {
        const recipeIngredientFormAttributeName = 'recipeIngredients';

        if (event.target.name === recipeIngredientFormAttributeName) {
            handleRecipeIngredients(event, recipe).then(updated =>
                setRecipe(updated)
            );
        } else {
            setRecipe({
                ...recipe,
                [event.target.name]: event.target.value
            });
        }

        setFormStatus(FormStatuses.Unsaved);
    }

    const handleCancel = event => {
        event.preventDefault();
        isAdd
            ? navigate(`${AppRoutes.root}`)
            : navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
    };

    function onAddSuccess(data) {
        setFormStatus(FormStatuses.Saved);
        // data "should be" the recipeId
        data && navigate(`${AppRoutes.recipe}/${data}`);
    }

    function onEditSuccess(data, event) {
        setFormStatus(FormStatuses.Saved);
        const submitButtonAction = event.nativeEvent.submitter.value;

        submitButtonAction === 'save-and-exit' && navigate(-1);
    }

    function submitHandler(event) {
        event.preventDefault();
        // update the recipe after adding for the first time
        isAdd
            ? postRecipe(recipe, onAddSuccess)
            : postEditedRecipe(recipe, data => onEditSuccess(data, event));
    }

    return {
        recipe,
        formStatus,
        handleCancel,
        onUpdate,
        submitHandler,
        meta
    };
}

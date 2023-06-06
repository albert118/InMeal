import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import { defaultRecipe } from 'types/DefaultRecipe';
import { FormStatuses } from 'forms';

import { useRecipeIngredients } from 'hooks/services';

export default function useRecipeFormData({
	postEditedRecpie,
	postRecipe,
	existingRecipe
}) {
	const [recipe, setRecipe] = useState(existingRecipe ?? defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);
	const [errorMessages, setErrorMessages] = useState(null);

	const navigate = useNavigate();

	const { handleRecipeIngredients } = useRecipeIngredients();

	const updateRecipeDataHandler = async event => {
		const recipeIngredientFormAttributeName = 'recipeIngredients';

		if (event.target.name === recipeIngredientFormAttributeName) {
			setRecipe(await handleRecipeIngredients(event, recipe));
		} else {
			setRecipe({
				...recipe,
				[event.target.name]: event.target.value
			});
		}

		setFormStatus(FormStatuses.Unsaved);
	};

	const clearChanges = event => {
		event.preventDefault();
		recipe.id ? setRecipe(recipe) : setRecipe(defaultRecipe);
		setFormStatus(FormStatuses.Saved);
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
	};

	const handleErrorResponse = errors => {
		if (!errors) {
			setFormStatus(FormStatuses.Saved);
			setErrorMessages(null);
		} else {
			setFormStatus(FormStatuses.Error);
			setErrorMessages(errors);
		}

		return !errors;
	};

	const submitAdditionalHandler = async event => {
		event.preventDefault();

		// update the recipe after adding for the first time
		if (recipe.id) {
			const errors = await postEditedRecpie(recipe);
			handleErrorResponse(errors);
		} else {
			const errors = await postRecipe(recipe);
			handleErrorResponse(errors);
		}
	};

	const submitEditHandler = async event => {
		event.preventDefault();

		const errors = await postEditedRecpie(recipe);

		if (handleErrorResponse(errors)) {
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		}
	};

	return {
		recipe,
		formStatus,
		errorMessages,
		clearChanges,
		handleCancel,
		submitAdditionalHandler,
		submitEditHandler,
		updateRecipeDataHandler
	};
}

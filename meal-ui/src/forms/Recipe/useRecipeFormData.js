import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import { defaultRecipe } from 'types/DefaultRecipe';
import { FormStatuses } from 'forms';

import { useRecipeIngredients } from 'hooks/services';
import { isFalsishOrEmpty } from 'utils';

export default function useRecipeFormData({
	patchRecipe,
	postRecipe,
	existingRecipe
}) {
	const [recipe, setRecipe] = useState(existingRecipe ?? defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

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

	const submitAdditionalHandler = async event => {
		event.preventDefault();

		let response;

		// update the recipe after adding for the first time
		if (recipe.id) {
			response = await patchRecipe(recipe);

			if (response.ok) {
				setFormStatus(FormStatuses.Saved);
			} else {
				setFormStatus(FormStatuses.Error);
			}
		} else {
			response = await postRecipe(recipe);

			if (!isFalsishOrEmpty(response)) {
				setRecipe({ ...recipe, id: response });
				setFormStatus(FormStatuses.Saved);
			} else {
				setFormStatus(FormStatuses.Error);
			}
		}
	};

	const submitEditHandler = async event => {
		event.preventDefault();

		const response = await patchRecipe(recipe);

		if (response.ok) {
			setFormStatus(FormStatuses.Saved);
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		} else {
			setFormStatus(FormStatuses.Error);
		}
	};

	return {
		recipe,
		formStatus,
		clearChanges,
		handleCancel,
		submitAdditionalHandler,
		submitEditHandler,
		updateRecipeDataHandler
	};
}

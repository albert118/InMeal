import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import { defaultRecipe } from 'types/DefaultRecipe';
import { FormStatuses } from 'forms';

import { useRecipeIngredients } from 'hooks/services';
import { useRecipe } from 'hooks/data';
import { ErrorDetailContext } from 'hooks/data';

export default function useRecipeFormData() {
	const { recipeId } = useParams();
	const { postEditedRecipe, postRecipe, recipe: existingRecipe } = useRecipe(recipeId);
	const [recipe, setRecipe] = useState(existingRecipe ?? defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const { error } = useContext(ErrorDetailContext);

	const navigate = useNavigate();

	const { handleRecipeIngredients } = useRecipeIngredients();

	useEffect(() => {
		setRecipe(existingRecipe);
	}, [existingRecipe]);

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

	function handlePotentialErrors() {
		console.log(error);
		setFormStatus(!error ? FormStatuses.Saved : FormStatuses.Error);
		return !error;
	}

	function submitAdditionalHandler(event) {
		event.preventDefault();

		// update the recipe after adding for the first time
		if (recipe.id) {
			postEditedRecipe(recipe);
		} else {
			postRecipe(recipe);
		}

		handlePotentialErrors();
	}

	function submitEditHandler(event) {
		event.preventDefault();

		postEditedRecipe(recipe);
		if (handlePotentialErrors()) {
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		}
	}

	return {
		recipe,
		formStatus,
		errorMessages: error,
		clearChanges,
		handleCancel,
		submitAdditionalHandler,
		submitEditHandler,
		updateRecipeDataHandler
	};
}

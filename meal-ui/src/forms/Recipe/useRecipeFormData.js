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
	// determines if we are adding or updating a recipe
	const isAdd = !!!recipeId;

	const { postEditedRecipe, postRecipe, recipe: existingRecipe } = useRecipe(recipeId);
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

	const onUpdate = async event => {
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

	const handleCancel = event => {
		event.preventDefault();
		isAdd ? navigate(`${AppRoutes.root}`) : navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
	};

	function submitHandler(event) {
		event.preventDefault();
		// update the recipe after adding for the first time
		recipe.id ? postEditedRecipe(recipe) : postRecipe(recipe);
		setFormStatus(FormStatuses.Saved);
	}

	return {
		recipe,
		formStatus,
		errors: error,
		handleCancel,
		onUpdate,
		submitHandler,
		isAdd
	};
}

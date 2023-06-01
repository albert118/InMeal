import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput } from 'forms/Inputs';
import HeroImage from 'pages/EditRecipe/Forms/HeroImage';
import { FormActions } from 'pages/EditRecipe/Forms/FormActions';
import { FormBody } from 'pages/EditRecipe/Forms/FormBody';
import AppRoutes from 'navigation/AppRoutes';
import { postRecipe, patchRecipe } from 'dataHooks/useRecipe';
import { useRecipeIngredients } from 'dataHooks';
import { demoImage } from 'DemoImage';
import { isFalsishOrEmpty } from 'utils';
import { defaultRecipe } from './DefaultRecipe';
import Button from 'components/Button';

export function AddRecipeForm() {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);
	const {
		ingredientOptions,
		handleAddingAsync,
		handleRemoving,
		handleUpdating
	} = useRecipeIngredients();

	const navigate = useNavigate();

	const submitHandler = async event => {
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

	const clearChanges = event => {
		event.preventDefault();
		recipe.id ? setRecipe(recipe) : setRecipe(defaultRecipe);
		setFormStatus(FormStatuses.Saved);
	};

	const handleRecipeIngredients = async event => {
		if (event.target.id === 'new-item') {
			setRecipe(await handleAddingAsync(event.target.value, recipe));
		} else if (isFalsishOrEmpty(event.target.value)) {
			setRecipe(handleRemoving(event.target.id, recipe));
		} else {
			setRecipe(
				handleUpdating(event.target.id, event.target.value, recipe)
			);
		}
	};

	const updateRecipeDataHandler = async event => {
		if (event.target.name === 'recipeIngredients') {
			handleRecipeIngredients(event);
		} else {
			setRecipe({
				...recipe,
				[event.target.name]: event.target.value
			});
		}

		setFormStatus(FormStatuses.Unsaved);
	};

	return (
		<FormContainer
			className='card recipe-card e-recipe-form'
			onSubmit={submitHandler}
		>
			<HeroImage
				image={demoImage}
				label={recipe.title}
				status={formStatus}
			/>

			<TitleBar>
				<TextInput
					name='title'
					value={recipe.title}
					placeholder='Add a descriptive title'
					handler={updateRecipeDataHandler}
				/>
			</TitleBar>

			<FormBody
				blurb={recipe.blurb}
				preparationSteps={recipe.preparationSteps}
				ingredients={recipe.recipeIngredients}
				ingredientOptions={ingredientOptions}
				handler={updateRecipeDataHandler}
			/>

			{recipe.id && (
				<ViewRecipeBtn
					handler={() => navigate(`${AppRoutes.recipe}/${recipe.id}`)}
				/>
			)}

			<FormActions
				clearChanges={clearChanges}
				handleCancel={() => navigate(`${AppRoutes.root}`)}
				saveActionText='save'
			/>
		</FormContainer>
	);
}

export function ViewRecipeBtn({ handler }) {
	return (
		<div className='action-container view-recipe-action'>
			<Button
				className='view-recipe-btn'
				onClick={handler}
			>
				view recipe
			</Button>
		</div>
	);
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import {
	LongTextInput,
	MultiSelectWithMultiLine,
	TextInput
} from 'forms/Inputs';
import HeroImage from 'pages/EditRecipe/Forms/HeroImage';
import { FormActions } from 'pages/EditRecipe/Forms/FormActions';
import AppRoutes from 'navigation/AppRoutes';
import { postRecipe, patchRecipe } from 'dataHooks/useRecipe';
import { useRecipeIngredients } from 'dataHooks';
import { demoImage } from 'DemoImage';
import { isFalsishOrEmpty } from 'utils';
import { defaultRecipe } from './DefaultRecipe';
import { ViewRecipeBtn } from './ViewRecipeBtn';

export function AddRecipeForm({ ingredientOptions }) {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);
	const { handleAddingAsync, handleRemoving, handleUpdating } =
		useRecipeIngredients();

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

			<div className='recipe--data scrollbar-vertical'>
				<LongTextInput
					className='recipe--blurb'
					name='blurb'
					value={recipe.blurb}
					placeholder='maybe some details too?'
					handler={updateRecipeDataHandler}
				/>

				<MultiSelectWithMultiLine
					className='recipe--ingredients'
					items={recipe.ingredients}
					selectableOptions={ingredientOptions}
					attrName='recipeIngredients'
					onChange={updateRecipeDataHandler}
					placeholder='add another ingredient'
				/>

				<LongTextInput
					className='recipe--steps'
					name='preparationSteps'
					value={recipe.preparationSteps}
					placeholder='include lots of details and steps'
					handler={updateRecipeDataHandler}
					rows='20'
				/>
			</div>

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

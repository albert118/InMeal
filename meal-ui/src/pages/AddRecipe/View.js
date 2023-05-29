import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput } from 'forms/Inputs';
import Button from 'components/Button';
import HeroImage from 'pages/EditRecipe/HeroImage';
import { FormActions } from 'pages/EditRecipe/FormActions';
import { FormBody } from 'pages/EditRecipe/FormBody';

import AppRoutes from 'navigation/AppRoutes';
import { postRecipe, patchRecipe, putIngredient } from 'dataHooks/useRecipe';

import { demoImage } from 'DemoImage';
import { createIngredient } from './createIngredient';
import { isFalsishOrEmpty } from 'utils';
import { defaultRecipe } from './DefaultRecipe';

export default function View() {
	const [recipe, setRecipe] = useState(defaultRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

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
			// new item
			const dto = await putIngredient(event.target.value);

			// TODO: quantity logic
			const fakeQuantity = 1;
			const newIngredient = createIngredient(
				event.target.value,
				dto.id,
				fakeQuantity
			);

			// add the ingredient to the existing ingredients
			const recipeIngredientsCopy = { ...recipe.recipeIngredients };
			recipeIngredientsCopy[dto.id] = newIngredient;

			setRecipe({ ...recipe, recipeIngredients: recipeIngredientsCopy });
		} else if (isFalsishOrEmpty(event.target.value)) {
			// remove item
			const recipeIngredientsCopy = { ...recipe.recipeIngredients };
			delete recipeIngredientsCopy[event.target.id];

			setRecipe({
				...recipe,
				recipeIngredients: recipeIngredientsCopy
			});
		} else {
			// existing item
			setRecipe({
				...recipe,
				recipeIngredients: {
					// ... take existing ingredients
					...recipe.recipeIngredients,
					// ... selecting the given ID
					[event.target.id]: {
						// ... and applying a change only to the ingredient label
						...[recipe.recipeIngredients[event.target.id]],
						label: event.target.value
					}
				}
			});
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

function ViewRecipeBtn({ handler }) {
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

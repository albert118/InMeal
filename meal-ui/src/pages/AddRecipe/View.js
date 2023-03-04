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

	const [ingredients, setIngredients] = useState([]);

	const [newIngredient, setNewIngredient] = useState('');
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		let response;

		// update the recipe after adding for the first time
		if (recipe.id) {
			response = await patchRecipe(recipe, ingredients);

			if (response.ok) {
				setFormStatus(FormStatuses.Saved);
			} else {
				setFormStatus(FormStatuses.Error);
			}
		} else {
			response = await postRecipe(recipe, ingredients);

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

		// clear the recipe to the latest saved recipe
		// this is the default if no recipe has been saved yet
		if (recipe.id) {
			setRecipe(recipe);
			setIngredients(ingredients);
		} else {
			setRecipe(defaultRecipe);
			setIngredients([]);
		}

		setFormStatus(FormStatuses.Saved);
	};

	const updateRecipeDataHandler = event => {
		setRecipe({
			...recipe,
			[event.target.name]: event.target.value
		});

		setFormStatus(FormStatuses.Unsaved);
	};

	const addIngredientHandler = async event => {
		event.preventDefault();

		if (!newIngredient || newIngredient === '') {
			alert('actually add an ingredient 😉');
			return;
		}

		const response = await putIngredient(newIngredient);

		// include the ID from the response
		// fake the quantity
		setIngredients([
			...ingredients,
			createIngredient(newIngredient, response.id, 1)
		]);

		// allow a new ingredient to be added
		setNewIngredient('');
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
				handler={updateRecipeDataHandler}
				ingredients={ingredients}
				newIngredient={newIngredient}
				addIngredientHandler={addIngredientHandler}
				setNewIngredient={setNewIngredient}
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
				handler={handler}
			>
				view recipe
			</Button>
		</div>
	);
}

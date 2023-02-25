import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput, LongTextInput, MultiLineInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';
import Button from 'components/Button';
import ImageHero from 'pages/EditRecipe/HeroImage';

import AppRoutes from 'navigation/AppRoutes';
import { postRecipe, patchRecipe, putIngredient } from 'dataHooks/useRecipe';

import { demoImage } from 'DemoImage';
import { createIngredient } from './createIngredient';

const defaultRecipe = Object.freeze({
	id: null,
	title: 'new recipe',
	blurb: ''
});

function isFalsishOrEmpty(str) {
	return !str || (typeof response === 'string' && str.length > 0);
}

export default function View() {
	const [recipe, setRecipe] = useState(defaultRecipe);

	const [ingredients, setIngredients] = useState([]);

	const [preparationSteps, setPreparationSteps] = useState([]);

	const [newIngredient, setNewIngredient] = useState('');
	const [newStep, setNewStep] = useState('');
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		let response;

		// update the recipe after adding for the first time
		if (recipe.id) {
			response = await patchRecipe(recipe, ingredients, preparationSteps);

			if (response.ok) {
				setFormStatus(FormStatuses.Saved);
			} else {
				setFormStatus(FormStatuses.Error);
			}
		} else {
			response = await postRecipe(recipe, ingredients, preparationSteps);

			if (!isFalsishOrEmpty(response)) {
				setRecipe({ ...recipe, id: response });
				setFormStatus(FormStatuses.Saved);
			} else {
				setFormStatus(FormStatuses.Error);
			}
		}
	};

	const viewRecipe = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${recipe.id}`);
	};

	const clearChanges = event => {
		event.preventDefault();

		// clear the recipe to the latest saved recipe
		// this is the default if no recipe has been saved yet
		if (recipe.id) {
			setRecipe(recipe);
			setIngredients(ingredients);
			setPreparationSteps(preparationSteps);
		} else {
			setRecipe(defaultRecipe);
			setIngredients([]);
			setPreparationSteps([]);
		}

		setFormStatus(FormStatuses.Saved);
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.root}`);
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

	const addPreparationStepHandler = event => {
		event.preventDefault();

		if (!newStep || newStep === '') {
			alert('actually add a preparation step 😄');
			return;
		}

		setPreparationSteps([...preparationSteps, newStep]);

		// allow a new step to be added
		setNewStep('');
		setFormStatus(FormStatuses.Unsaved);
	};

	return (
		<FormContainer
			className='recipe-form-card'
			onSubmit={submitHandler}
		>
			<ImageHero
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

			<div className='recipe-data-slot recipe-content-grid'>
				<LongTextInput
					className='recipe-content-blurb'
					name='blurb'
					value={recipe.blurb}
					placeholder='Maybe some details too?'
					handler={updateRecipeDataHandler}
				/>

				<MultiLineInput
					className='recipe-content-ingredients'
					items={ingredients}
					newItem={newIngredient}
					newItemHandler={event =>
						setNewIngredient(event.target.value)
					}
					addNewItemHandler={addIngredientHandler}
					placeholder='add another ingredient'
				/>

				<MultiLineInput
					className='recipe-content-preparation-steps'
					items={preparationSteps}
					newItem={newStep}
					newItemHandler={event => setNewStep(event.target.value)}
					addNewItemHandler={addPreparationStepHandler}
					placeholder='include a further step'
				/>
			</div>

			{recipe.id && (
				<div className='action-container view-recipe-action'>
					<Button
						className='view-recipe-btn'
						handler={viewRecipe}
					>
						view recipe
					</Button>
				</div>
			)}
			<div className='action-container'>
				<Button handler={clearChanges}>clear changes</Button>
				<CancelButton handler={handleCancel} />
				<SaveButton>save</SaveButton>
			</div>
		</FormContainer>
	);
}

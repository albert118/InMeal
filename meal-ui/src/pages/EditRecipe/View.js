import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput, LongTextInput, MultiLineInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';
import Button from 'components/Button';
import ImageHero from './HeroImage';
import { patchRecipe, putIngredient } from 'dataHooks/useRecipe';
import { demoImage } from '../../DemoImage';
import { createIngredient } from './IngredientMapper';

export default function View(props) {
	const { existingRecipe } = props;

	const [recipe, setRecipe] = useState(existingRecipe);

	const [ingredients, setIngredients] = useState(
		existingRecipe.recipeIngredientDtos &&
			existingRecipe.recipeIngredientDtos.length !== 0
			? existingRecipe.recipeIngredientDtos
			: []
	);

	const [preparationSteps, setPreparationSteps] = useState(
		existingRecipe.prepSteps && existingRecipe.prepSteps.length !== 0
			? existingRecipe.prepSteps
			: []
	);

	const [newIngredient, setNewIngredient] = useState('');
	const [newStep, setNewStep] = useState('');
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		const response = await patchRecipe(
			recipe,
			ingredients,
			preparationSteps
		);

		if (response.ok) {
			setFormStatus(FormStatuses.Saved);
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		} else {
			setFormStatus(FormStatuses.Error);
		}
	};

	const clearChanges = event => {
		event.preventDefault();
		setRecipe(existingRecipe);

		setFormStatus(FormStatuses.Saved);

		setIngredients(
			existingRecipe.recipeIngredientDtos.length !== 0
				? existingRecipe.recipeIngredientDtos
				: []
		);

		setPreparationSteps(
			existingRecipe.prepSteps.length !== 0
				? existingRecipe.prepSteps
				: []
		);
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
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

		// include the correct ID
		setIngredients([
			...ingredients,
			createIngredient(newIngredient, response.id, 1)
		]);

		// include the ID from the response
		// fake the quantity
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

			<div className='action-container'>
				<Button handler={clearChanges}>clear changes</Button>
				<CancelButton handler={handleCancel} />
				<SaveButton>save and complete</SaveButton>
			</div>
		</FormContainer>
	);
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput } from 'forms/Inputs';
import HeroImage from './HeroImage';
import { patchRecipe, putIngredient } from 'dataHooks/useRecipe';
import { demoImage } from '../../DemoImage';
import { createIngredient } from './IngredientMapper';
import { FormBody } from './FormBody';
import { FormActions } from './FormActions';

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
				updateRecipeDataHandler={updateRecipeDataHandler}
				ingredients={ingredients}
				newIngredient={newIngredient}
				addIngredientHandler={addIngredientHandler}
				setNewIngredient={setNewIngredient}
				preparationSteps={preparationSteps}
				newStep={newStep}
				setNewStep={setNewStep}
				addPreparationStepHandler={addPreparationStepHandler}
			/>

			<FormActions
				clearChanges={clearChanges}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}

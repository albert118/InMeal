import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput } from 'forms/Inputs';
import { FormBody } from './FormBody';
import { FormActions } from './FormActions';
import HeroImage from './HeroImage';

import AppRoutes from 'navigation/AppRoutes';
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

	const [newIngredient, setNewIngredient] = useState('');
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		const response = await patchRecipe(recipe, ingredients);

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

			<FormActions
				clearChanges={clearChanges}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}

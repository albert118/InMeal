import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput, LongTextInput, MultiLineInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';
import Button from 'components/Button';
import ImageHero from './HeroImage';

export default function View(props) {
	const { existingRecipe } = props;

	const [recipe, setRecipe] = useState(existingRecipe);

	const [ingredients, setIngredients] = useState(
		existingRecipe.recipeIngredientDtos.length !== 0
			? existingRecipe.recipeIngredientDtos
			: []
	);

	const [newIngredient, setNewIngredient] = useState('');

	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		const url = 'https://localhost:7078/api/recipe';

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'PATCH',
			body: JSON.stringify({
				...recipe,
				recipeIngredientDtos: ingredients
			})
		});

		if (response.ok) {
			setFormStatus(FormStatuses.Saved);
		} else {
			setFormStatus(FormStatuses.Error);
		}

		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
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

	const addIngredientHandler = event => {
		event.preventDefault();

		if (!newIngredient || newIngredient === '') {
			alert('actually add an ingredient 😉');
			return;
		}

		setIngredients([...ingredients, createIngredient(newIngredient, 1)]);

		// allow a new ingredient to be added
		setNewIngredient('');
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
				/>

				<LongTextInput
					className='recipe-content-preparation-steps'
					name='preparationSteps'
					value={recipe.prepSteps}
					placeholder='Include the steps to make this recipe'
					handler={updateRecipeDataHandler}
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

const demoImage = Object.freeze({
	label: null,
	url: 'https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif'
});

const defaultRequestOptions = Object.freeze({
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json'
	},
	redirect: 'follow',
	referrerPolicy: 'no-referrer'
});

const createIngredient = (name, numberOf) => {
	return {
		label: name,
		ingredientId: crypto.randomUUID(),
		quantity: {
			amount: numberOf,
			units: 0
		}
	};
};

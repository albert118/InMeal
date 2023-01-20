import FormContainer from 'forms/FormContainer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import StatusBadge from 'components/StatusBadge';
import { FormStatuses } from 'forms';
import { TextInput, LongTextInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';
import Button from 'components/Button';

const demoImage = {
	label: null,
	url: 'https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif'
};

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

export default function View(props) {
	const { existingRecipe } = props;

	const [recipe, setRecipe] = useState(existingRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		const url = 'https://localhost:7078/api/recipe';

		const response = await fetch(url, {
			...defaultRequestOptions,
			method: 'PATCH',
			body: JSON.stringify(recipe)
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

	return (
		<FormContainer
			className='recipe-form-card'
			handler={submitHandler}
		>
			<div className='image-slot'>
				<img
					src={demoImage.url}
					alt={demoImage.label}
				/>
				<StatusBadge
					className='e-image-status-badge'
					status={formStatus}
				/>
			</div>

			<TitleBar>
				<TextInput
					name={'title'}
					value={recipe.title}
					placeholder='Add a descriptive title'
					handler={updateRecipeDataHandler}
				/>
			</TitleBar>

			<div className='recipe-data-slot recipe-content-grid'>
				<LongTextInput
					className='recipe-content-blurb'
					name={'blurb'}
					value={recipe.blurb}
					placeholder='Maybe some details too?'
					handler={updateRecipeDataHandler}
				/>

				<LongTextInput
					className='recipe-content-ingredients'
					name={'recipeIngredients'}
					value={recipe.recipeIngredientDtos}
					placeholder='What ingredients do you need?'
					handler={updateRecipeDataHandler}
				/>

				<LongTextInput
					className='recipe-content-preparation-steps'
					name={'preparationSteps'}
					value={recipe.prepSteps}
					placeholder='Include the steps to make this recipe'
					handler={updateRecipeDataHandler}
				/>
			</div>

			<div className='action-container'>
				<Button handler={clearChanges}>Clear changes</Button>
				<CancelButton handler={handleCancel} />
				<SaveButton>save and complete</SaveButton>
			</div>
		</FormContainer>
	);
}

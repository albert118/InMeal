import FormContainer from 'forms/FormContainer';
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import StatusBadge from 'components/StatusBadge';
import { FormStatuses } from 'forms';
import { TextInput, LongTextInput } from 'forms/Inputs';
import { CancelButton, SaveButton } from 'forms/FormActions';

const demoImage = {
	label: null,
	url: 'https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif'
};

const demoStatus = FormStatuses.Saved;

export default function View(props) {
	const { existingRecipe } = props;

	const [recipe, setRecipe] = useState(existingRecipe);

	const navigate = useNavigate();

	const submitHandler = e => {
		e.preventDefault();
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
	};

	const handleSave = useCallback(async event => {
		event.preventDefault();
		console.log('saved the form!');
	}, []);

	const updateRecipeDataHandler = useCallback(event => {
		setRecipe({
			...recipe,
			[event.target.name]: event.target.value
		});
	}, []);

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
					status={demoStatus}
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
				<CancelButton handler={handleCancel} />
				<SaveButton handler={handleSave}>save and complete</SaveButton>
			</div>
		</FormContainer>
	);
}

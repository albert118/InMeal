import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import {
	LongTextInput,
	MultiSelectWithMultiLine,
	TextInput
} from 'forms/Inputs';
import AppRoutes from 'navigation/AppRoutes';
import { useRecipeIngredients } from 'hooks';
import StatusBadge from 'components/StatusBadge';

import { FormActions } from './FormActions';
import HeroImage from './HeroImage';

import { demoImage } from '../../../DemoImage';

export function EditRecipeForm({
	existingRecipe,
	ingredientOptions,
	patchRecipe
}) {
	const [recipe, setRecipe] = useState(existingRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);
	const { handleRecipeIngredients } = useRecipeIngredients();

	const navigate = useNavigate();

	const submitHandler = async event => {
		event.preventDefault();

		const response = await patchRecipe(recipe);

		if (response.ok) {
			setFormStatus(FormStatuses.Saved);
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		} else {
			setFormStatus(FormStatuses.Error);
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
	};

	const updateRecipeDataHandler = async event => {
		if (event.target.name === 'recipeIngredients') {
			setRecipe(await handleRecipeIngredients(event, recipe));
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
			className='card recipe-card'
			onSubmit={submitHandler}
		>
			<HeroImage
				image={demoImage}
				label={recipe.title}
			/>

			<TitleBar>
				<TextInput
					name='title'
					value={recipe.title}
					placeholder='Add a descriptive title'
					handler={updateRecipeDataHandler}
				/>
				<StatusBadge
					className='e-image-status-badge'
					status={formStatus}
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
					items={recipe.recipeIngredients}
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

			<FormActions handleCancel={handleCancel} />
		</FormContainer>
	);
}

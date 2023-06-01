import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleBar from 'components/TitleBar/TitleBar';
import FormContainer, { FormStatuses } from 'forms';
import { TextInput } from 'forms/Inputs';
import { FormBody } from './FormBody';
import { FormActions } from './FormActions';
import HeroImage from './HeroImage';
import AppRoutes from 'navigation/AppRoutes';
import { patchRecipe } from 'dataHooks/useRecipe';
import { useRecipeIngredients } from 'dataHooks';
import { isFalsishOrEmpty } from 'utils';
import { demoImage } from '../../../DemoImage';
import StatusBadge from 'components/StatusBadge';

export function EditRecipeForm({ existingRecipe }) {
	const [recipe, setRecipe] = useState(existingRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);
	const { handleAddingAsync, handleRemoving, handleUpdating } =
		useRecipeIngredients();

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

	const handleRecipeIngredients = async event => {
		if (event.target.id === 'new-item') {
			setRecipe(await handleAddingAsync(event.target.value, recipe));
		} else if (isFalsishOrEmpty(event.target.value)) {
			setRecipe(handleRemoving(event.target.id, recipe));
		} else {
			setRecipe(
				handleUpdating(event.target.id, event.target.value, recipe)
			);
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

			<FormBody
				blurb={recipe.blurb}
				preparationSteps={recipe.preparationSteps}
				ingredients={recipe.recipeIngredients}
				handler={updateRecipeDataHandler}
			/>

			<FormActions handleCancel={handleCancel} />
		</FormContainer>
	);
}

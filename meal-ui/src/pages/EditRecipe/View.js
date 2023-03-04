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
import { createIngredient } from 'pages/AddRecipe/createIngredient';
import { isFalsishOrEmpty } from 'utils';

import { demoImage } from '../../DemoImage';

export default function View(props) {
	const { existingRecipe } = props;

	const [recipe, setRecipe] = useState(existingRecipe);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const navigate = useNavigate();

	const submitHandler = async () => {
		console.log(JSON.stringify(recipe.recipeIngredients));

		const response = await patchRecipe(recipe);

		if (response.ok) {
			setFormStatus(FormStatuses.Saved);
			navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
		} else {
			setFormStatus(FormStatuses.Error);
		}
	};

	const clearChanges = () => {
		setRecipe(existingRecipe);
		setFormStatus(FormStatuses.Saved);
	};

	const handleCancel = event => {
		event.preventDefault();
		navigate(`${AppRoutes.recipe}/${existingRecipe.id}`);
	};

	const handleRecipeIngredients = async event => {
		if (event.target.id === 'new-item') {
			// new item
			const dto = await putIngredient(event.target.value);

			// TODO: quantity logic
			const fakeQuantity = 1;
			const newIngredient = createIngredient(
				event.target.value,
				dto.id,
				fakeQuantity
			);

			// add the ingredient to the existing ingredients
			const recipeIngredientsCopy = { ...recipe.recipeIngredients };
			recipeIngredientsCopy[dto.id] = newIngredient;

			setRecipe({ ...recipe, recipeIngredients: recipeIngredientsCopy });
		} else if (isFalsishOrEmpty(event.target.value)) {
			// remove item
			const recipeIngredientsCopy = { ...recipe.recipeIngredients };
			delete recipeIngredientsCopy[event.target.id];

			setRecipe({
				...recipe,
				recipeIngredients: recipeIngredientsCopy
			});
		} else {
			// existing item
			setRecipe({
				...recipe,
				recipeIngredients: {
					// ... take existing ingredients
					...recipe.recipeIngredients,
					// ... selecting the given ID
					[event.target.id]: {
						// ... and applying a change only to the ingredient label
						...[recipe.recipeIngredients[event.target.id]],
						label: event.target.value
					}
				}
			});
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
				ingredients={recipe.recipeIngredients}
				handler={updateRecipeDataHandler}
			/>

			<FormActions
				clearChanges={clearChanges}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}

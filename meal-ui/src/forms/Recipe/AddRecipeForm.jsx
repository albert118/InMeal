import { useNavigate } from 'react-router-dom';
import { TitleBar, StatusBadge } from 'components';
import FormContainer from 'forms';
import {
	LongTextInput,
	MultiSelectWithMultiLine,
	TextInput
} from 'forms/Inputs';
import AppRoutes from 'navigation/AppRoutes';
import { demoImage } from 'DemoImage';
import { ViewRecipeButton, HeroImage, FormActions } from './components';
import useRecipeFormData from './useRecipeFormData';

export default function AddRecipeForm({
	ingredientOptions,
	postEditedRecpie,
	postRecipe
}) {
	const {
		recipe,
		formStatus,
		submitHandler,
		clearChanges,
		updateRecipeDataHandler
	} = useRecipeFormData({ postEditedRecpie, postRecipe });

	const navigate = useNavigate();

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

			{recipe.id && (
				<ViewRecipeButton
					handler={() => navigate(`${AppRoutes.recipe}/${recipe.id}`)}
				/>
			)}

			<FormActions
				clearChanges={clearChanges}
				handleCancel={() => navigate(`${AppRoutes.root}`)}
				saveActionText='save'
			/>
		</FormContainer>
	);
}

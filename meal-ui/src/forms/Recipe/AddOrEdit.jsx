import { TitleBar, StatusBadge, Image } from 'components';
import FormContainer from 'forms';
import { LongTextInput, MultiSelectWithMultiLine, TextInput } from 'forms/Inputs';
import { ViewRecipeButton, FormActions, ValidationErrors } from './components';
import useRecipeFormData from './useRecipeFormData';

export default function AddOrEdit({ ingredientOptions }) {
	const {
		recipe,
		formStatus,
		errorMessages,
		submitHandler,
		updateRecipeDataHandler,
		handleCancel,
		isAdd
	} = useRecipeFormData();

	return (
		<FormContainer
			className='card recipe-card e-recipe-form'
			onSubmit={submitHandler}
		>
			<Image
				alt={recipe.title}
				className='image-slot'
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
				<ValidationErrors errors={errorMessages} />
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

			{isAdd && <ViewRecipeButton recipeId={recipe.id} />}

			<FormActions handleCancel={handleCancel} />
		</FormContainer>
	);
}

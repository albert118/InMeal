import { TitleBar, StatusBadge, Image } from 'components';
import { LongTextInput, MultiSelectWithMultiLine, TextInput } from 'forms/Inputs';
import { FormActions, ValidationErrors } from './components';
import { useIngredients } from 'hooks/data';
import useRecipeFormData from './useRecipeFormData';
import FormContainer from 'forms';

export default function AddOrEdit() {
	const { recipe, formStatus, errors, submitHandler, onUpdate, handleCancel, isAdd } =
		useRecipeFormData();

	return (
		<FormContainer
			className='two-pane-recipe-card'
			onSubmit={submitHandler}
		>
			<LeftPane
				recipe={recipe}
				formStatus={formStatus}
				errors={errors}
				onUpdate={onUpdate}
			/>
			<RightPane
				recipe={recipe}
				onUpdate={onUpdate}
				isAdd={isAdd}
				handleCancel={handleCancel}
			/>
		</FormContainer>
	);
}

function LeftPane({ recipe, formStatus, errors, onUpdate }) {
	const { ingredients } = useIngredients();

	return (
		<div className='card recipe-card two-pane-recipe-card--left'>
			<Image
				alt={recipe.title}
				className='image-slot'
			/>

			<TitleBar>
				<TextInput
					name='title'
					value={recipe.title}
					placeholder='Add a descriptive title'
					handler={onUpdate}
				/>
				<StatusBadge
					className='e-image-status-badge'
					status={formStatus}
				/>
				{errors && <ValidationErrors errors={errors} />}
			</TitleBar>

			<div className='recipe--data scrollbar-vertical'>
				<LongTextInput
					className='recipe--blurb'
					name='blurb'
					value={recipe.blurb}
					placeholder='maybe some details too?'
					handler={onUpdate}
				/>

				<MultiSelectWithMultiLine
					className='recipe--ingredients'
					items={recipe.recipeIngredients}
					selectableOptions={ingredients}
					attrName='recipeIngredients'
					onChange={onUpdate}
					placeholder='add another ingredient'
				/>
			</div>
		</div>
	);
}

function RightPane({ recipe, onUpdate, isAdd, handleCancel }) {
	return (
		<div className='card recipe-card two-pane-recipe-card--right'>
			<div className='recipe--data scrollbar-vertical'>
				<LongTextInput
					className='recipe--steps'
					name='preparationSteps'
					value={recipe.preparationSteps}
					placeholder='include lots of details and steps'
					handler={onUpdate}
					rows='20'
				/>
			</div>

			<FormActions
				showViewButton={isAdd && recipe.id}
				recipeId={recipe.id}
				handleCancel={handleCancel}
			/>
		</div>
	);
}

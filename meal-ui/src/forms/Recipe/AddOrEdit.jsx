import { TitleBar, StatusBadge, Image } from 'components';
import FormContainer from 'forms';
import { LongTextInput, MultiSelectWithMultiLine, TextInput } from 'forms/Inputs';
import { ViewRecipeButton, FormActions, ValidationErrors } from './components';
import useRecipeFormData from './useRecipeFormData';
import { useIngredients } from 'hooks/data';

export default function AddOrEdit() {
	const { recipe, formStatus, errors, submitHandler, onUpdate, handleCancel, isAdd } =
		useRecipeFormData();

	return (
		<FormContainer
			className='card recipe-card e-recipe-form'
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
			/>

			{isAdd && recipe.id && <ViewRecipeButton recipeId={recipe.id} />}

			<FormActions handleCancel={handleCancel} />
		</FormContainer>
	);
}

function LeftPane({ recipe, formStatus, errors, onUpdate }) {
	const { ingredients } = useIngredients();

	return (
		<div className='e-recipe-form--left'>
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
				<ValidationErrors errors={errors} />
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

function RightPane({ recipe, onUpdate }) {
	<div className='e-recipe-form--right'>
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
	</div>;
}

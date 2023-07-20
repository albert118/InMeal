import { LongTextInput } from 'forms/Inputs';
import { FormActions } from './components';

export function RightPane({ recipe, onUpdate, isAdd, handleCancel }) {
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

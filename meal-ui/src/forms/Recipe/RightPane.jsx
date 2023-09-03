import { LongTextInput } from 'forms/Inputs';
import { FormActions } from './components';

export function RightPane({ recipe, onUpdate, handleCancel }) {
	return (
		<div className='card recipe-card two-pane-recipe-card--right'>
			<div className='recipe--data'>
				<LongTextInput
					className='recipe--steps scrollbar-vertical'
					name='preparationSteps'
					value={recipe.preparationSteps}
					placeholder='include lots of details and steps'
					handler={onUpdate}
					rows='20'
				/>
			</div>

			<FormActions handleCancel={handleCancel} />
		</div>
	);
}

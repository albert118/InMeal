import { LongTextInput, MultiLineInput } from 'forms/Inputs';

export function FormBody({ blurb, preparationSteps, ingredients, handler }) {
	return (
		<div className='recipe--data scrollbar-vertical'>
			<LongTextInput
				className='recipe--blurb'
				name='blurb'
				value={blurb}
				placeholder='maybe some details too?'
				handler={handler}
			/>

			<MultiLineInput
				className='recipe--ingredients'
				items={ingredients}
				attrName='recipeIngredients'
				handler={handler}
				placeholder='add another ingredient'
			/>

			<LongTextInput
				className='recipe--steps'
				name='preparationSteps'
				value={preparationSteps}
				placeholder='include lots of details and steps'
				handler={handler}
				rows='20'
			/>
		</div>
	);
}

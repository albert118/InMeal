import { LongTextInput, MultiLineInput } from 'forms/Inputs';

export function FormBody({ blurb, preparationSteps, ingredients, handler }) {
	return (
		<div className='recipe-data-slot recipe-content-grid scrollbar-vertical'>
			<LongTextInput
				className='recipe-content-blurb'
				name='blurb'
				value={blurb}
				placeholder='maybe some details too?'
				handler={handler}
			/>

			<MultiLineInput
				className='recipe-content-ingredients'
				items={ingredients}
				attrName='recipeIngredients'
				handler={handler}
				placeholder='add another ingredient'
			/>

			<LongTextInput
				className='recipe-content-preparation-steps'
				name='preparationSteps'
				value={preparationSteps}
				placeholder='include lots of details and steps'
				handler={handler}
				rows='20'
			/>
		</div>
	);
}

import { LongTextInput, MultiSelectWithMultiLine } from 'forms/Inputs';

export function FormBody({
	blurb,
	preparationSteps,
	ingredients,
	ingredientOptions,
	handler
}) {
	return (
		<div className='recipe--data scrollbar-vertical'>
			<LongTextInput
				className='recipe--blurb'
				name='blurb'
				value={blurb}
				placeholder='maybe some details too?'
				handler={handler}
			/>

			<MultiSelectWithMultiLine
				className='recipe--ingredients'
				items={ingredients}
				selectableOptions={ingredientOptions}
				attrName='recipeIngredients'
				onChange={handler}
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

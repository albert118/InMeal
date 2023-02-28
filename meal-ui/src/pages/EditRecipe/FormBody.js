import { LongTextInput, MultiLineInput } from 'forms/Inputs';

export function FormBody({
	blurb,
	ingredients,
	newIngredient,
	preparationSteps,
	updateRecipeDataHandler,
	setNewIngredient,
	addIngredientHandler,
	newStep,
	setNewStep,
	addPreparationStepHandler
}) {
	return (
		<div className='recipe-data-slot recipe-content-grid scrollbar-vertical'>
			<LongTextInput
				className='recipe-content-blurb'
				name='blurb'
				value={blurb}
				placeholder='Maybe some details too?'
				handler={updateRecipeDataHandler}
			/>

			<MultiLineInput
				className='recipe-content-ingredients'
				items={ingredients}
				newItem={newIngredient}
				newItemHandler={event => setNewIngredient(event.target.value)}
				addNewItemHandler={addIngredientHandler}
				placeholder='add another ingredient'
			/>

			<MultiLineInput
				className='recipe-content-preparation-steps'
				items={preparationSteps}
				newItem={newStep}
				newItemHandler={event => setNewStep(event.target.value)}
				addNewItemHandler={addPreparationStepHandler}
				placeholder='include a further step'
			/>
		</div>
	);
}

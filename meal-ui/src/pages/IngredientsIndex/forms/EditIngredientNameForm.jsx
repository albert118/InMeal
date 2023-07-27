import { TextInput, Checkbox } from 'forms/Inputs';
import { ValidationWarnings } from 'forms/Validation';

export default function EditIngredientForm({
	formData,
	disableDeletion,
	recipeUsageCount,
	onChange,
	measurementOptions
}) {
	const getWarnings = count => {
		const recipePlural = count > 1 ? 'recipes' : 'recipe';
		const usagePlural = count > 1 ? 'usages' : 'usage';

		return [
			`ingredient is currently used in ${count} ${recipePlural}`,
			`remove the ${usagePlural} to delete this ingredient`
		];
	};

	return (
		<div className='edit-ingredient-form'>
			<TextInput
				name='name'
				label='name'
				value={formData.name}
				handler={onChange}
				placeHolder="what's this ingredient called?"
			></TextInput>
			<TextInput
				name='units'
				label='measurement'
				value={formData.units}
				handler={onChange}
				placeHolder='how is this ingredient measured?'
			></TextInput>

			<div className='edit-ingredient-form--remove'>
				<Checkbox
					name='isDeleted'
					label='delete ingredient?'
					onClick={onChange}
					disabled={disableDeletion}
				/>
				{disableDeletion && <ValidationWarnings warnings={getWarnings(recipeUsageCount)} />}
			</div>
		</div>
	);
}

import { Dropdown } from 'components';
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

			<Dropdown
				id='add-new-item-select'
				label='choose a measurement'
				items={measurementOptions}
				title='measurement'
				selectedItem={formData.unit}
				onChange={selectedUnit => {
					onChange({
						target: { name: 'unit', value: selectedUnit.label }
					});
				}}
			/>

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

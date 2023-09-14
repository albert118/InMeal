import { Dropdown } from 'components';
import FormContainer from 'forms';
import { CancelButton, SaveButton } from 'forms/FormActions';
import useEditIngredientFormData from 'forms/Ingredient/useEditIngredientFormData';
import { Checkbox, TextInput } from 'forms/Inputs';
import { ValidationErrors, ValidationWarnings } from 'forms/Validation';
import { ErrorDetailContext } from 'hooks/data';
import { useContext } from 'react';

export default function EditIngredientContainer() {
	return (
		<div className='p-edit-ingredient'>
			<EditIngredientForm />
		</div>
	);
}

function EditIngredientForm() {
	const { formData, measurementOptions, onUpdate, getWarnings, canDelete, onSubmit, onCancel } =
		useEditIngredientFormData();

	const { error } = useContext(ErrorDetailContext);

	const onDropdownUpdate = selected => {
		onUpdate({
			target: { name: 'unit', value: selected.label }
		});
	};

	<FormContainer
		className='edit-ingredient-form'
		onSubmit={onSubmit}
	>
		<TextInput
			name='name'
			label='name'
			value={formData.name}
			onChange={onUpdate}
			placeholder="what's this ingredient called?"
		/>

		<Dropdown
			id='multi-line-input__add-select'
			label='choose a measurement'
			items={measurementOptions}
			title='measurement'
			selectedItem={formData.unit}
			onChange={onDropdownUpdate}
		/>

		{error && <ValidationErrors errors={error} />}

		<div className='edit-ingredient-form--remove'>
			<Checkbox
				name='isDeleted'
				label='delete ingredient?'
				onClick={onUpdate}
				disabled={canDelete()}
			/>
			{canDelete() && <ValidationWarnings warnings={getWarnings()} />}
		</div>
		<div className='edit-ingredient-form__actions'>
			<CancelButton onClick={onCancel} />
			<SaveButton />
		</div>
	</FormContainer>;
}

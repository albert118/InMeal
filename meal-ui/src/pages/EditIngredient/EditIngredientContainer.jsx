import { useContext } from 'react';
import useEditIngredientFormData from 'forms/Ingredient/useEditIngredientFormData';
import { Dropdown } from 'components';
import { TextInput, Checkbox } from 'forms/Inputs';
import { ValidationErrors, ValidationWarnings } from 'forms/Validation';
import { ErrorDetailContext } from 'hooks/data';
import { SaveButton, CancelButton } from 'forms/FormActions';
import FormContainer from 'forms';

export default function EditIngredientContainer() {
	const {
		formData,
		measurementOptions,
		onUpdate,
		getWarnings,
		canDelete,
		formStatus,
		...formHooks
	} = useEditIngredientFormData();

	const { error } = useContext(ErrorDetailContext);

	const onDropdownUpdate = selected => {
		onUpdate({
			target: { name: 'unit', value: selected.label }
		});
	};

	return (
		<div className='p-edit-ingredient'>
			<FormContainer
				className='edit-ingredient-form'
				{...formHooks}
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
						disabled={canDelete}
					/>
					{canDelete && <ValidationWarnings warnings={getWarnings()} />}
				</div>
				<div className='edit-ingredient-form__actions'>
					<CancelButton {...formHooks} />
					<SaveButton />
				</div>
			</FormContainer>
		</div>
	);
}

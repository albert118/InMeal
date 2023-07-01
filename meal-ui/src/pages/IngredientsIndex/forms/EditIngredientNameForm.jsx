import { TextInput, Checkbox } from 'forms/Inputs';

export default function EditIngredientForm({ currentName, disableDeletion, onChange }) {
	return (
		<div className='edit-ingredient-name-form'>
			<TextInput
				name='name'
				label='name'
				value={currentName}
				handler={onChange}
				placeHolder="what's this ingredient called?"
			></TextInput>
			<Checkbox
				disabled={disableDeletion}
				name='isDeleted'
				label='delete ingredient?'
				handler={onChange}
			/>
		</div>
	);
}

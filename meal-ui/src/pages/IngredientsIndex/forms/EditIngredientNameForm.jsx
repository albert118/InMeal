import { TextInput } from 'forms/Inputs';

export default function EditIngredientNameForm({ currentName, onChange }) {
	return (
		<div className='edit-ingredient-name-form'>
			<TextInput
				label='name'
				value={currentName}
				handler={onChange}
				placeHolder="what's this ingredient called?"
			></TextInput>
		</div>
	);
}

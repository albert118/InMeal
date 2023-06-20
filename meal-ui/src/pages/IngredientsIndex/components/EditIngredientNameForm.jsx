import { useRef } from 'react';
import { TextInput } from 'forms/Inputs';

export default function EditIngredientNameForm({ existingIngredient }) {
	const newIngredientNameRef = useRef(null);

	return (
		<div className='edit-ingredient-name-form'>
			<label>
				<>Current name</>
				<br />
				<>{existingIngredient.name}</>{' '}
			</label>
			<TextInput
				label='new name'
				value={newIngredientNameRef.current}
				placeHolder={existingIngredient.name}
			></TextInput>
		</div>
	);
}

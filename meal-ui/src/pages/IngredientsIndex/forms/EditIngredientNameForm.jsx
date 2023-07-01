import { TextInput, Checkbox } from 'forms/Inputs';
import { SimpleLabel } from 'forms';

export default function EditIngredientForm({
	currentName,
	disableDeletion,
	recipeUsageCount,
	onChange
}) {
	const getUnableToDeleteReasonLabel = count => {
		const recipePlural = count > 1 ? 'recipes' : 'recipe';
		const usagePlural = count > 1 ? 'usages' : 'usage';

		return `ingredient is currently used in ${count} ${recipePlural} \nremove the ${usagePlural} to delete this ingredient`;
	};

	return (
		<div className='edit-ingredient-name-form'>
			<TextInput
				name='name'
				label='name'
				value={currentName}
				handler={onChange}
				placeHolder="what's this ingredient called?"
			></TextInput>
			{disableDeletion ? (
				<SimpleLabel label={getUnableToDeleteReasonLabel(recipeUsageCount)} />
			) : (
				<Checkbox
					name='isDeleted'
					label='delete ingredient?'
					handler={onChange}
				/>
			)}
		</div>
	);
}

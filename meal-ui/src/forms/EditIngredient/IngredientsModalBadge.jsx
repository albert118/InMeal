import { useContext } from 'react';
import IngredientBadge from './IngredientBadge';
import useEditIngredientFormData from './useEditIngredientFormData';
import { Dropdown, EditModalWrapper } from 'components';
import { TextInput, Checkbox } from 'forms/Inputs';
import { ValidationErrors, ValidationWarnings } from 'forms/Validation';
import { ErrorDetailContext } from 'hooks/data';

export default function IngredientsModalBadge({ ingredient, refreshData, measurementOptions }) {
	const { formData, onSubmit, onUpdate, getWarnings, disableDelete } =
		useEditIngredientFormData(ingredient);

	const { error } = useContext(ErrorDetailContext);

	const onDropdownUpdate = selected => {
		onUpdate({
			target: { name: 'unit', value: selected.label }
		});
	};

	return (
		<EditModalWrapper
			editCallback={onSubmit}
			refreshCallback={refreshData}
			headingText='Update ingredient'
			labelText={`editing ${ingredient.name}`}
			buttonComponent={
				<IngredientBadge
					ingredientName={ingredient.name}
					recipeUsagesCount={ingredient.recipeUsageCount}
				/>
			}
		>
			<div className='edit-ingredient-form'>
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
						disabled={disableDelete}
					/>
					{disableDelete && <ValidationWarnings warnings={getWarnings()} />}
				</div>
			</div>
		</EditModalWrapper>
	);
}

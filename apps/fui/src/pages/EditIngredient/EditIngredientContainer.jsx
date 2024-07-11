import { Dropdown, ToggleInline, GlassBackground } from '../../components';
import FormContainer from '../../forms';
import { CancelButton, SaveButton } from '../../forms/FormActions';
import useEditIngredientFormData from '../../forms/Ingredient/useEditIngredientFormData';
import { TextInput } from '../../forms/Inputs';
import { ValidationErrors, ValidationWarnings } from '../../forms/Validation';
import { ErrorDetailContext } from '../../hooks/data';
import { useContext } from 'react';

export default function EditIngredientContainer() {
    return (
        <div className='p-edit-ingredient'>
            <h2>
                Edit Ingredient
                <label>edit ingredient details</label>
            </h2>

            <EditIngredientForm />
        </div>
    );
}

function EditIngredientForm() {
    const {
        formData,
        measurementOptions,
        onUpdate,
        getWarnings,
        canDelete,
        onSubmit,
        onCancel
    } = useEditIngredientFormData();

    const { error } = useContext(ErrorDetailContext);

    const onDropdownUpdate = selected => {
        onUpdate({
            target: { name: 'unit', value: selected.label }
        });
    };

    return (
        <FormContainer
            className='card edit-ingredient-card'
            onSubmit={onSubmit}
        >
            <GlassBackground />

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

            <div className='edit-ingredient-card__remove'>
                <ToggleInline
                    id='is_deleted'
                    name='isDeleted'
                    labelText='delete ingredient?'
                    labelA='no'
                    labelB='yes'
                    disabled={canDelete()}
                    onClick={onUpdate}
                />
                <br />
                {canDelete() && <ValidationWarnings warnings={getWarnings()} />}
            </div>

            <div className='edit-ingredient-card__actions'>
                <CancelButton onClick={onCancel} />
                <SaveButton />
            </div>
        </FormContainer>
    );
}

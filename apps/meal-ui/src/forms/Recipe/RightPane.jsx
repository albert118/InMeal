import { Dropdown } from 'components';
import { LongTextInput, NumberInput } from 'forms/Inputs';
import { CancelButton, SaveButton, SaveAndExitButton } from 'forms/FormActions';

export function RightPane({ recipe, meta, onUpdate, handleCancel }) {
    const { categories, types, courses } = meta;

    const onDropdownUpdate = (name, selected) => {
        onUpdate({
            target: { name: name, value: selected }
        });
    };

    return (
        <div className='card recipe-card two-pane-recipe-card--right'>
            <div className='recipe-card__data scrollbar-vertical'>
                <div className='recipe-data__meta'>
                    <div className='meta-row'>
                        <Dropdown
                            id='recipe-data__category'
                            label='choose a category'
                            items={categories}
                            title='category'
                            selectedItem={recipe.category}
                            onChange={selected =>
                                onDropdownUpdate('category', selected)
                            }
                        />
                        <NumberInput
                            onChange={onUpdate}
                            name='servings'
                            value={recipe.servings}
                            label='servings'
                        />
                    </div>

                    <div className='meta-row'>
                        <Dropdown
                            id='recipe-data__type'
                            label='choose a meal type'
                            items={types}
                            title='meal type'
                            selectedItem={recipe.type}
                            onChange={selected =>
                                onDropdownUpdate('type', selected)
                            }
                        />
                        <NumberInput
                            onChange={onUpdate}
                            name='prepTime'
                            value={recipe.prepTime}
                            label='preparation time'
                        />
                    </div>

                    <div className='meta-row'>
                        <Dropdown
                            id='recipe-data__course'
                            label='choose which course'
                            items={courses}
                            title='course'
                            selectedItem={recipe.course}
                            onChange={selected =>
                                onDropdownUpdate('course', selected)
                            }
                        />
                        <NumberInput
                            onChange={onUpdate}
                            name='cookTime'
                            value={recipe.cookTime}
                            label='cook time'
                        />
                    </div>
                </div>
                <LongTextInput
                    label='steps and notes'
                    className='recipe__steps'
                    name='preparationSteps'
                    value={recipe.preparationSteps}
                    placeholder='include lots of detail'
                    onChange={onUpdate}
                    rows='20'
                />
            </div>

            <div className='recipe-card__actions'>
                <CancelButton onClick={handleCancel} />
                <SaveButton />
                <SaveAndExitButton />
            </div>
        </div>
    );
}

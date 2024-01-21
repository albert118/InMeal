import {
    Image,
    MultiSelectWithMultiLine,
    StatusBadge,
    TitleBar
} from '../../components';
import { LongTextInput, NumberInput, TextInput } from '../../forms/Inputs';
import { ValidationErrors } from '../../forms/Validation';
import {
    ErrorDetailContext,
    useIngredients,
    useRecipeImage
} from '../../hooks/data';
import { useContext } from 'react';
import { MultiSelectItemBadge } from './components';

export function LeftPane({ recipe, formStatus, onUpdate }) {
    const { ingredients } = useIngredients();
    const { error: errors } = useContext(ErrorDetailContext);
    // TODO: this should be phased out once the real content can be loaded
    const { getRecipeImage } = useRecipeImage();
    const recipeImage = getRecipeImage(null);

    return (
        <div className='card recipe-card two-pane-recipe-card--left'>
            <Image
                alt={recipeImage.label}
                className='image-slot'
                url={recipeImage.url}
            />

            <TitleBar>
                <TextInput
                    name='title'
                    value={recipe.title}
                    placeholder='add a descriptive title'
                    onChange={onUpdate}
                />
                <StatusBadge
                    className='e-image-status-badge'
                    status={formStatus}
                />
                {errors && <ValidationErrors errors={errors} />}
            </TitleBar>

            <div className='recipe-card__data scrollbar-vertical'>
                <LongTextInput
                    label='blurb'
                    className='recipe-data__blurb'
                    name='blurb'
                    value={recipe.blurb}
                    placeholder='maybe some details too?'
                    onChange={onUpdate}
                />

                <MultiSelectWithMultiLine
                    label='or add existing'
                    className='recipe-data__ingredients'
                    items={recipe.recipeIngredients}
                    selectableOptions={ingredients}
                    attrName='recipeIngredients'
                    entityName='ingredients'
                    onChange={onUpdate}
                    placeholder='add ingredient(s)'
                >
                    <MultiSelectItemRow onChange={onUpdate} />
                </MultiSelectWithMultiLine>
            </div>
        </div>
    );
}

function MultiSelectItemRow({ item, attrName, onRemove, onUpdate }) {
    return (
        <div className='ingredient-form-row' key={item.id}>
            <NumberInput
                className='ingredient-form-row__quantity'
                name='recipeIngredients'
                id={item.label}
                value={item.quantity}
                placeholder='how many?'
                onChange={onUpdate}
            />
            <MultiSelectItemBadge
                className='ingredient-form-row__detail'
                item={item}
                attrName={attrName}
                onChange={onRemove}
                key={item.hasOwnProperty('label') ? item.label : item}
                subLabel={item.units.name}
            />
        </div>
    );
}

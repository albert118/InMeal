import { FilterableMultiSelect, MultiSelect } from '@carbon/react';
import mapToDropdownItems from './mappers';

export function MultiSelectCustom({ items, onChange, ...additionalProps }) {
    const defaultItem = 'default-select-option';

    return (
        <MultiSelect
            items={mapToDropdownItems(items)}
            onChange={event => onChange(event.selectedItems)}
            defaultValue={defaultItem}
            className={`e-cds-form-input ${additionalProps.className ?? ''}`}
            {...additionalProps}
        />
    );
}

export function FilterableMultiSelectCustom({
    items,
    onChange,
    ...additionalProps
}) {
    return (
        <div className={`e-cds-form-input ${additionalProps.className ?? ''}`}>
            {additionalProps.label ? (
                <label htmlFor={additionalProps.label}>
                    {additionalProps.label}
                </label>
            ) : (
                ''
            )}
            <FilterableMultiSelect
                id={additionalProps.label ?? 'default_long_text_input_id'}
                items={mapToDropdownItems(items)}
                onChange={event => onChange(event.selectedItems)}
                {...additionalProps}
            />
        </div>
    );
}

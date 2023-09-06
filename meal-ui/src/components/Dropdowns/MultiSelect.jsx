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

export function FilterableMultiSelectCustom({ items, onChange, ...additionalProps }) {
	return (
		<FilterableMultiSelect
			items={mapToDropdownItems(items)}
			onChange={event => onChange(event.selectedItems)}
			className={`e-cds-form-input ${additionalProps.className ?? ''}`}
			{...additionalProps}
		/>
	);
}

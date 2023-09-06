import { FilterableMultiSelect, MultiSelect } from '@carbon/react';

const defaultItem = 'default-select-option';

export function MultiSelectCustom({ items, onChange, ...additionalProps }) {
	return (
		<MultiSelect
			items={mapToDropdownItems(items)}
			onChange={event => onChange(event.selectedItems)}
			defaultValue={defaultItem}
			className='e-cds-form-input'
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

function mapToDropdownItems(items) {
	return items.map(item => {
		return {
			...item,
			id: item.id ?? 1,
			label: item.name
		};
	});
}

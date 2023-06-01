import { MultiSelect } from '@carbon/react';

const defaultItem = 'default-select-option';

export default function MultiSelectCustom({ items, id, label }) {
	return (
		<MultiSelect
			className='e-cds-form-input'
			id={id}
			label={label}
			defaultValue={defaultItem}
			items={mapToDropdownItems(items)}
		/>
	);
}

function mapToDropdownItems(items) {
	return items.map(item => {
		return {
			id: item.id,
			label: item.name
		};
	});
}

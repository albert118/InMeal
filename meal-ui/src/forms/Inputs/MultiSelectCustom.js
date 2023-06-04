import { MultiSelect } from '@carbon/react';

const defaultItem = 'default-select-option';

export default function MultiSelectCustom({
	items,
	id,
	label,
	setSelectedItemIds
}) {
	return (
		<MultiSelect
			className='e-cds-form-input'
			id={id}
			label={label}
			defaultValue={defaultItem}
			items={items}
			// the onChange passes back an array of selectedItems which is the same structure as whatever we passed in
			onChange={event =>
				setSelectedItemIds(event.selectedItems.map(item => item.id))
			}
		/>
	);
}

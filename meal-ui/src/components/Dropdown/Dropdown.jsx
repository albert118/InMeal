import { Dropdown } from '@carbon/react';

export default function DropdownCustom({ items, onChange, ...additionalProps }) {
	return (
		<Dropdown
			items={mapToDropdownItems(items)}
			onChange={event => onChange(event.selectedItem)}
			{...additionalProps}
		/>
	);
}

function mapToDropdownItems(items) {
	return items.map(item => {
		return {
			id: item.id ? item.id : 1,
			label: item.name
		};
	});
}

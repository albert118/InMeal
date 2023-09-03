import { Dropdown } from '@carbon/react';
import { objectMap } from 'utils';

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
	if (Array.isArray(items)) return mapArray(items);
	if (typeof items === 'object') return mapObjects(items);

	return [];
}

function mapArray(items) {
	return items.map(item => {
		return {
			id: item.id ? item.id : 1,
			label: item.name
		};
	});
}

function mapObjects(items) {
	return objectMap(items, (key, value) => {
		return { id: key, label: value };
	});
}

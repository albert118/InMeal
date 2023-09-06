import { Dropdown } from '@carbon/react';
import mapToDropdownItems from './mappers';

export function DropdownCustom({ items, onChange, ...additionalProps }) {
	return (
		<Dropdown
			items={mapToDropdownItems(items)}
			onChange={event => onChange(event.selectedItem)}
			{...additionalProps}
		/>
	);
}

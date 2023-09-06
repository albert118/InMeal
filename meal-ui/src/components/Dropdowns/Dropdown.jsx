import { Dropdown } from '@carbon/react';
import mapToDropdownItems from './mappers';

export function DropdownCustom({ items, onChange, ...additionalProps }) {
	return (
		<div className={`e-cds-form-input ${additionalProps.className ?? ''}`}>
			{additionalProps.label && (
				<label htmlFor={additionalProps.label}>{additionalProps.label}</label>
			)}
			<Dropdown
				items={mapToDropdownItems(items)}
				onChange={event => onChange(event.selectedItem)}
				{...additionalProps}
			/>
		</div>
	);
}

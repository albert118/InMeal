import { MultiSelect } from '@carbon/react';

const defaultItem = 'default-select-option';

export function AMultiselect({ children, ...additionalProps }) {
	return (
		<div {...additionalProps}>
			<select>
				<Option
					key={defaultItem}
					label='Select an item'
					value={defaultItem}
				/>
				{children}
			</select>
		</div>
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

export function MultiSelectCustom({ items, id, label }) {
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

export function Option({ label, value }) {
	return <option value={value}>{label}</option>;
}

const defaultItem = 'default-select-option';

export function Multiselect({ children, ...additionalProps }) {
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

export function Option({ label, value }) {
	return <option value={value}>{label}</option>;
}

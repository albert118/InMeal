export default function Checkbox({ label, className, ...additionalProps }) {
	return (
		<div className={`form-input u-form-flexed-input ${className ?? ''}`}>
			<input
				id={label}
				type='checkbox'
				{...additionalProps}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

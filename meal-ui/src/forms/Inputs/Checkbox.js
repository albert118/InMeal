export default function Checkbox({ label, className, disabled, ...additionalProps }) {
	return (
		<div className={`form-input u-form-flexed-input ${className ?? ''}`}>
			<input
				id={label}
				type='checkbox'
				disabled={disabled}
				{...additionalProps}
			/>
			<label
				className={`${disabled ? 'disabled' : ''}`}
				htmlFor={label}
			>
				{label}
			</label>
		</div>
	);
}

export default function Checkbox({ label, handler, className, ...additionalProps }) {
	const classes = className
		? `form-input u-form-flexed-input ${className}`
		: `form-input u-form-flexed-input`;

	return (
		<div className={classes}>
			<input
				type='checkbox'
				id={label}
				onClick={handler}
				{...additionalProps}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

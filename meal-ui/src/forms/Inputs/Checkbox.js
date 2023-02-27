import React from 'react';

export default function Checkbox(props) {
	const { name, label, value, handler, className } = props;

	const classes = className
		? `form-input u-form-flexed-input ${className}`
		: `form-input u-form-flexed-input`;

	return (
		<div className={classes}>
			<input
				type='checkbox'
				id={label}
				value={value}
				name={name}
				onClick={handler}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

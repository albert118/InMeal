import React from 'react';

export default function Checkbox(props) {
	const { name, label, value } = props;

	return (
		<div className='form-input u-form-flexed-input'>
			<input
				type='checkbox'
				id={label}
				value={value}
				name={name}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

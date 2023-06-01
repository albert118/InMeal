import React from 'react';

export default function TextInput({
	className,
	name,
	label,
	value,
	placeholder,
	handler,
	id,
	handleKeyDown
}) {
	const classes = className ? `form-input ${className}` : `form-input`;

	const getIdOrLabel = () => {
		if (id) return id;
		if (label) return label;

		return 'generic-text-input-id';
	};

	return (
		<div className={classes}>
			{label ? <label htmlFor={label}>{label}</label> : ''}
			<input
				id={getIdOrLabel()}
				className='text-input'
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={handler}
				onKeyDown={handleKeyDown}
				type='text'
			/>
		</div>
	);
}

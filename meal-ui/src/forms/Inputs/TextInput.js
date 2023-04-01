import React from 'react';

const TextInput = props => {
	const { className, name, label, value, placeholder, handler, id } = props;

	const classes = className ? `form-input ${className}` : `form-input`;

	const getIdOrLabel = () => {
		if (id) return id;
		if (label) return label;

		return 'generic-text-input-id';
	};

	return (
		<div className={classes}>
			{label ?? <label htmlFor={label}>{label}</label>}
			<input
				id={getIdOrLabel()}
				className='text-input'
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={handler}
				type='text'
			/>
		</div>
	);
};

export { TextInput };

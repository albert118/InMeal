import React from 'react';

export default function FormContainer(props) {
	const { className, onSubmit } = props;

	const classes = className
		? `meal-ui-form-theme form ${className}`
		: `meal-ui-form-theme form`;

	return (
		<form
			className={classes}
			onSubmit={onSubmit}
		>
			{props.children}
		</form>
	);
}

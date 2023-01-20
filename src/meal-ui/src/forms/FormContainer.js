import React from 'react';

const FormContainer = props => {
	const { className, handler } = props;

	const classes = className
		? `meal-ui-form-theme form ${className}`
		: `meal-ui-form-theme form`;

	return (
		<form
			className={classes}
			onSubmit={handler}
		>
			{props.children}
		</form>
	);
};

export default FormContainer;

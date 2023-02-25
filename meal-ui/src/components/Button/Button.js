import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = props => {
	const { className, handler } = props;

	const classes = className ? `btn ${className}` : `btn`;

	return (
		<button
			className={classes}
			type='button'
			onClick={handler}
		>
			{props.children}
		</button>
	);
};

const IconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	const classes = isPrimary ? 'icon-btn primary-icon-btn' : 'icon-btn';

	return (
		<button
			className={classes}
			type='button'
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
		</button>
	);
};

export { Button, IconButton };

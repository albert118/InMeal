import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@nextui-org/react';

const CustomButton = props => {
	const { className, handler } = props;

	const classes = className ? `btn ${className}` : `btn`;

	return (
		<Button
			className={classes}
			onClick={handler}
		>
			{props.children}
		</Button>
	);
};

const IconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	return (
		<Button
			auto
			rounded
			color={isPrimary ? 'primary' : 'secondary'}
			size='sm'
			icon={<FontAwesomeIcon icon={faIcon} />}
			onClick={handler}
		/>
	);
};

const LabelledIconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	return (
		<Button
			auto
			rounded
			color={isPrimary ? 'primary' : 'secondary'}
			icon={<FontAwesomeIcon icon={faIcon} />}
			onClick={handler}
		>
			{props.children}
		</Button>
	);
};

export { CustomButton as Button, IconButton, LabelledIconButton };

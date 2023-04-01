import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';

const CustomButton = props => {
	const { handler } = props;

	return (
		<Button
			fullWidth
			variant='outlined'
			onClick={handler}
		>
			{props.children}
		</Button>
	);
};

const CustomIconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	return (
		<IconButton
			variant='plain'
			fullWidth
			color={isPrimary ? 'primary' : 'info'}
			size='lg'
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
		</IconButton>
	);
};

const LabelledIconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	return (
		<Button
			startDecorator={<FontAwesomeIcon icon={faIcon} />}
			size='lg'
			color={isPrimary ? 'primary' : 'info'}
			fullWidth
			onClick={handler}
		>
			{props.children}
		</Button>
	);
};

export {
	CustomButton as Button,
	CustomIconButton as IconButton,
	LabelledIconButton
};

import React from 'react';
import Button from 'components/Button';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';

const TitleBar = props => {
	const { className, btnText, handler } = props;

	const classes = className ? `title-bar ${className}` : `title-bar`;

	return (
		<Box
			sx={{ display: 'flex', padding: 'var(--ns-half)' }}
			className={classes}
		>
			<Typography
				level='h3'
				sx={{ color: 'white' }}
			>
				{props.children}
			</Typography>
			{!!btnText && <Button handler={handler}>{btnText}</Button>}
		</Box>
	);
};

export default TitleBar;

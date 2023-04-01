import TitleBar from 'components/TitleBar/TitleBar';
import React from 'react';
import Card from '@mui/joy/Card';

const CustomCard = props => {
	const { className, title } = props;

	return (
		<Card
			variant='solid'
			className={className ? `card ${className}` : `card`}
		>
			<TitleBar>{title}</TitleBar>
			<div className='content-slot'>{props.children}</div>
		</Card>
	);
};

export { CustomCard as Card };

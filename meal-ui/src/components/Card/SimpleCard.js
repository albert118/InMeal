import React from 'react';

const Card = props => {
	const { className } = props;

	const classes = className
		? `card simple-card ${className}`
		: `card simple-card`;

	return (
		<div className={classes}>
			<div className='content-slot'>{props.children}</div>
		</div>
	);
};

export default Card;

import TitleBar from 'components/TitleBar/TitleBar';
import React from 'react';

const Card = ({ className, title, children }) => {
	return (
		<div className={className ? `card ${className}` : `card`}>
			<TitleBar>{title}</TitleBar>
			<div className='content-slot'>{children}</div>
		</div>
	);
};

export default Card;

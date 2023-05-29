import React from 'react';
import Button from 'components/Button';

/// Titlebar with an optional button!
const TitleBar = props => {
	const { className, btnText, handler } = props;

	const classes = className ? `title-bar ${className}` : `title-bar`;

	return (
		<div className={classes}>
			<h2 className='title'>{props.children}</h2>
			{!!btnText && <Button onClick={handler}>{btnText}</Button>}
		</div>
	);
};

export default TitleBar;

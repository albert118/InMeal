import React from 'react';
import Button from 'components/Button';

/// Titlebar with an optional button!
export default function TitleBar({ className, btnText, handler, children }) {
	const classes = className ? `title-bar ${className}` : `title-bar`;

	return (
		<div className={classes}>
			<h2 className='title'>{children}</h2>
			{!!btnText && <Button onClick={handler}>{btnText}</Button>}
		</div>
	);
}

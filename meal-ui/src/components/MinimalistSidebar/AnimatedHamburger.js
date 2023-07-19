import { useState } from 'react';

export function AnimatedHamburger({ callback }) {
	const [isActive, setActive] = useState(false);

	function onClick(event) {
		event.preventDefault();
		setActive(!isActive);
		callback();
	}

	return (
		<div
			className={`hamburger ${isActive ? 'hamburger-toggle' : ''}`}
			onClick={onClick}
		>
			<div className='line1'></div>
			<div className='line2'></div>
			<div className='line3'></div>
		</div>
	);
}

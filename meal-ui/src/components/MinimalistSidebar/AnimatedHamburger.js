export function AnimatedHamburger({ onClick, isActive }) {
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

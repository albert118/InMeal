export function HeroBrandingLogo({ config, onClick }) {
	return (
		<div className='hero-branding-logo'>
			<button
				type='button'
				onClick={onClick}
			>
				<h1 className='hero-title'>{config.BrandName}</h1>
			</button>
			<div className='divider' />
		</div>
	);
}

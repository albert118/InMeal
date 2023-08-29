export function HeroBrandingLogo({ config, onClick }) {
	const letters = config.BrandName.split(' ')
		.map(e => [...e])
		.flat();

	return (
		<div className='hero-branding-logo'>
			<button
				type='button'
				onClick={onClick}
			>
				<h1 className='hero-title'>
					{letters.map(l => (
						<p>{l}</p>
					))}
				</h1>
			</button>
			<div className='divider' />
		</div>
	);
}

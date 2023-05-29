export default function HeroImage({ image, label }) {
	return (
		<div className='image-slot'>
			<img
				src={image.url}
				alt={label}
			/>
		</div>
	);
}

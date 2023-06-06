import { BeatLoader } from 'react-spinners';

export default function LoadingSpinner({ show }) {
	return (
		<BeatLoader
			className='loading-spinner-overlay'
			color='#9750dd'
			loading={show}
			speedMultiplier={0.7}
			size={50}
			margin={10}
		/>
	);
}

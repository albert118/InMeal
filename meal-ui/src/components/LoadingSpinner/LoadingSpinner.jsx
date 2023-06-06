import { PropagateLoader } from 'react-spinners';

export default function LoadingSpinner({ show }) {
	return (
		<PropagateLoader
			className='loading-spinner-overlay'
			color='#9750dd'
			loading={show}
			speedMultiplier={0.7}
			size={30}
		/>
	);
}

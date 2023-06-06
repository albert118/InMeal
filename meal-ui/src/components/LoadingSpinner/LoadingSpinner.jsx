import { PropagateLoader } from 'react-spinners';

export default function LoadingSpinner() {
	return (
		<PropagateLoader
			color='#9750dd'
			loading={true}
			speedMultiplier={0.7}
			size={20}
		/>
	);
}

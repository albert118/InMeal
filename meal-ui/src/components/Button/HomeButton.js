import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@carbon/react';

export default function HomeButton({ ...additionalProps }) {
	return (
		<Button
			{...additionalProps}
			className='btn labelled-icon-btn'
			kind='primary'
		>
			<FontAwesomeIcon icon={faHome} />
			<span>Home</span>
		</Button>
	);
}

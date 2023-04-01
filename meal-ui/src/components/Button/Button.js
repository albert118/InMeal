import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@carbon/react';

const CustomButton = props => {
	const { className, handler } = props;

	return (
		<Button
			size='lg'
			onClick={handler}
		>
			{props.children}
		</Button>
	);
};

const IconButton = props => {
	const { faIcon, handler } = props;

	return (
		<Button
			className='cds--btn--icon-only'
			kind='ghost'
			size='lg'
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
		</Button>
	);
};

const LabelledIconButton = props => {
	const { faIcon, handler, isPrimary } = props;

	return (
		<Button
			kind={isPrimary ? 'primary' : 'secondary'}
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
			{props.children}
		</Button>
	);
};

export { CustomButton as Button, IconButton, LabelledIconButton };

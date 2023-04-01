import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@carbon/react';

const CustomButton = ({ className, handler, children, ...additionalProps }) => {
	return (
		<Button
			{...additionalProps}
			className={className ? `btn  ${className}` : `btn`}
			onClick={handler}
		>
			{children}
		</Button>
	);
};

const IconButton = ({ faIcon, ...additionalProps }) => {
	return (
		<Button
			{...additionalProps}
			className='icon-btn cds--btn--icon-only'
			kind='ghost'
			size='lg'
		>
			<FontAwesomeIcon icon={faIcon} />
		</Button>
	);
};

const LabelledIconButton = ({
	faIcon,
	isPrimary,
	children,
	...additionalProps
}) => {
	return (
		<Button
			{...additionalProps}
			className='btn'
			kind={isPrimary ? 'primary' : 'ghost'}
		>
			<FontAwesomeIcon icon={faIcon} />
			{children}
		</Button>
	);
};

export { CustomButton as Button, IconButton, LabelledIconButton };

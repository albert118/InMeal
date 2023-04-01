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

const IconButton = ({ faIcon, handler, ...additionalProps }) => {
	return (
		<Button
			{...additionalProps}
			className='cds--btn--icon-only'
			kind='ghost'
			size='lg'
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
		</Button>
	);
};

const LabelledIconButton = ({
	faIcon,
	handler,
	isPrimary,
	children,
	...additionalProps
}) => {
	return (
		<Button
			{...additionalProps}
			kind={isPrimary ? 'primary' : 'secondary'}
			onClick={handler}
		>
			<FontAwesomeIcon icon={faIcon} />
			{children}
		</Button>
	);
};

export { CustomButton as Button, IconButton, LabelledIconButton };

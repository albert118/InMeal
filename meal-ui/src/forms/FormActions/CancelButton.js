import { Button } from '@carbon/react';

const CancelButton = ({ className, children, ...aditionalProps }) => {
	return (
		<Button
			{...aditionalProps}
			className={className ? `btn  ${className}` : `btn cancel-btn`}
			kind='tertiary'
		>
			{children ?? 'Save'}
		</Button>
	);
};

export default CancelButton;

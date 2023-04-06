import { Button } from '@carbon/react';

const CancelButton = ({ className, children, ...aditionalProps }) => {
	return (
		<Button
			{...aditionalProps}
			className={className ? `btn  ${className}` : `btn cancel-btn`}
			kind='tertiary'
		>
			{children ?? 'Cancel'}
		</Button>
	);
};

export default CancelButton;

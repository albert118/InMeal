import { Button } from '@carbon/react';

export default function SaveAndExitButton({ className, children, ...additionalProps }) {
	return (
		<Button
			{...additionalProps}
			className={className ? `btn  ${className}` : `btn save-btn`}
			kind='tertiary'
			type='submit'
			value='save-and-exit'
		>
			Save and Exit
		</Button>
	);
}

import { Button } from '@carbon/react';

export default function CancelButton({
    className,
    children,
    ...aditionalProps
}) {
    return (
        <Button
            {...aditionalProps}
            className={className ? `btn  ${className}` : `btn cancel-btn`}
            kind='tertiary'
        >
            {children ?? 'Cancel'}
        </Button>
    );
}

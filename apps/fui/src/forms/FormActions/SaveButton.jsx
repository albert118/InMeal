import { Button } from '@carbon/react';

export default function SaveButton({
    className,
    children,
    ...additionalProps
}) {
    return (
        <Button
            {...additionalProps}
            className={className ? `btn  ${className}` : `btn save-btn`}
            kind='tertiary'
            type='submit'
            value='save'
        >
            {children ?? 'Save'}
        </Button>
    );
}

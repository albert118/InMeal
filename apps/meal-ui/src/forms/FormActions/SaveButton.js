import { Button } from '@carbon/react';

const SaveButton = ({ className, children, ...additionalProps }) => {
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
};

export default SaveButton;

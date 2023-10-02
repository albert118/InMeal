import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@carbon/react';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';

const CustomButton = ({ className, children, ...additionalProps }) => {
    return (
        <Button
            {...additionalProps}
            className={className ? `btn  ${className}` : `btn`}
        >
            {children}
        </Button>
    );
};

const IconButton = ({ faIcon, isPrimary, ...additionalProps }) => {
    return (
        <Button
            {...additionalProps}
            className='icon-btn cds--btn--icon-only'
            kind={isPrimary ? 'primary' : 'ghost'}
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
            className='btn labelled-icon-btn'
            kind={isPrimary ? 'primary' : 'ghost'}
        >
            <FontAwesomeIcon icon={faIcon} />
            <span>{children}</span>
        </Button>
    );
};

function NavigationArrowLeft({ ...additionalProps }) {
    return (
        <ButtonBack className='btn nav-btn' {...additionalProps}>
            &lt;
        </ButtonBack>
    );
}

function NavigationArrowRight({ ...additionalProps }) {
    return (
        <ButtonNext className='btn nav-btn' {...additionalProps}>
            &gt;
        </ButtonNext>
    );
}

export {
    CustomButton as Button,
    IconButton,
    LabelledIconButton,
    NavigationArrowLeft,
    NavigationArrowRight
};

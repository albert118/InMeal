import { Toggle } from 'carbon-components-react';

export default function ToggleCustom({ onClick, ...additionalProps }) {
    const onClickAdaptor = event => {
        return onClick({
            target: {
                checked: event.target.ariaChecked !== 'true',
                ...event.target
            }
        });
    };

    return (
        <Toggle
            className={`toggle ${additionalProps.className ?? ''}`}
            onClick={onClickAdaptor}
            {...additionalProps}
        />
    );
}

export function ToggleInline({ onClick, ...additionalProps }) {
    const onClickAdaptor = event => {
        return onClick({
            target: {
                checked: event.target.ariaChecked !== 'true',
                ...event.target
            }
        });
    };

    return (
        <Toggle
            className={`toggle-inline ${additionalProps.className ?? ''}`}
            onClick={onClickAdaptor}
            {...additionalProps}
        />
    );
}

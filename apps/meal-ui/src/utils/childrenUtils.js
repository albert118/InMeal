import { cloneElement, isValidElement, Children } from 'react';

function propagateProps(children, props) {
    return Children.map(children, child => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, props);
    });
}

export { propagateProps };

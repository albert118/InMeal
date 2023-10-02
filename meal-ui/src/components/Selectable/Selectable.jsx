import { useState } from 'react';

export default function Selectable({ onClick, ...additionalProps }) {
    const [isSelected, setIsSelected] = useState(
        additionalProps.selected ?? false
    );

    return (
        <div
            className={
                additionalProps.className
                    ? `${additionalProps.className} selectable-section`
                    : 'selectable-section'
            }
            onClick={() => {
                setIsSelected(prev => !prev);
                // lazy variable update, we know it will be this inverse of current
                // we could wrap this and use a callback but this is quick
                onClick(!isSelected);
            }}
        >
            {additionalProps.children}
            <div
                className={`selectable-icon ${
                    isSelected ? 'is-selected' : 'not-selected'
                }`}
            >
                {isSelected ? '✅' : '⚪'}
            </div>
        </div>
    );
}

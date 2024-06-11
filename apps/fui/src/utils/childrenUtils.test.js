// propagateProps.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { propagateProps } from './childrenUtils';

describe('propagateProps', () => {
    test('should add props to all valid React elements', () => {
        const children = [
            <div key='1'>Child 1</div>,
            <span key='2'>Child 2</span>,
            'Just a text',
            <p key='3'>Child 3</p>
        ];
        const additionalProps = { className: 'test-class' };

        const result = propagateProps(children, additionalProps);

        const { container } = render(<>{result}</>);

        expect(container.querySelector('div').className).toBe('test-class');
        expect(container.querySelector('span').className).toBe('test-class');
        expect(container.querySelector('p').className).toBe('test-class');
        expect(container.textContent).toContain('Just a text');
    });

    test('should handle null children gracefully', () => {
        const children = [null, undefined, <div key='1'>Child 1</div>];
        const additionalProps = { className: 'test-class' };

        const result = propagateProps(children, additionalProps);

        const { container } = render(<>{result}</>);

        expect(container.querySelector('div').className).toBe('test-class');
    });

    test('should handle nested children correctly', () => {
        const children = [
            <div key='1'>
                <span key='1.1'>Nested Child</span>
            </div>,
            <p key='2'>Child 2</p>
        ];
        const additionalProps = { className: 'test-class' };

        const result = propagateProps(children, additionalProps);

        const { container } = render(<>{result}</>);

        expect(container.querySelector('div').className).toBe('test-class');
        expect(container.querySelector('span').className).not.toBe(
            'test-class'
        ); // Only direct children should be affected
        expect(container.querySelector('p').className).toBe('test-class');
    });

    test('should not modify non-element children', () => {
        const children = [
            'Just a text',
            123,
            false,
            <div key='1'>Child 1</div>
        ];
        const additionalProps = { className: 'test-class' };

        const result = propagateProps(children, additionalProps);

        const { container } = render(<>{result}</>);

        expect(container.querySelector('div').className).toBe('test-class');
        expect(container.textContent).toContain('Just a text');
        expect(container.textContent).toContain('123');
    });
});

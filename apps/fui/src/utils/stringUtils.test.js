import { isFalsishOrEmpty, stringifyType } from './stringUtils';

describe('stringUtils', () => {
    test('isFalsishOrEmpty should return true for falsy and empty values', () => {
        expect(isFalsishOrEmpty(null)).toBe(true);
        expect(isFalsishOrEmpty(undefined)).toBe(true);
        expect(isFalsishOrEmpty(false)).toBe(true);
        expect(isFalsishOrEmpty(0)).toBe(true);
        expect(isFalsishOrEmpty('')).toBe(true);
        expect(isFalsishOrEmpty('   ')).toBe(true);
    });

    test('isFalsishOrEmpty should return false for non-empty strings', () => {
        expect(isFalsishOrEmpty('hello')).toBe(false);
        expect(isFalsishOrEmpty(' world ')).toBe(false);
    });

    test('stringifyType should format strings correctly', () => {
        expect(stringifyType('helloWorld')).toBe('hello world');
        expect(stringifyType('thisIsATest')).toBe('this is a test');
        expect(stringifyType('HelloWorld')).toBe('hello world');
        expect(stringifyType('hello')).toBe('hello');
        expect(stringifyType('test')).toBe('test');
    });
});

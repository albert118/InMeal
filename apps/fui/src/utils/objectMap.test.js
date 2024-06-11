// objectUtils.test.js
import { objectMap, filterObjectMap } from './objectMap';

describe('objectUtils', () => {
    describe('objectMap', () => {
        test('should map over the object and apply the function to each entry', () => {
            const obj = { a: 1, b: 2, c: 3 };
            const result = objectMap(obj, (key, value) => [key, value * 2]);

            expect(result).toEqual([
                ['a', 2],
                ['b', 4],
                ['c', 6]
            ]);
        });

        test('should handle an empty object correctly', () => {
            const obj = {};
            const result = objectMap(obj, (key, value) => [key, value * 2]);

            expect(result).toEqual([]);
        });
    });

    describe('filterObjectMap', () => {
        test('should filter and map over the object correctly', () => {
            const obj = {
                a: [1, 2, 3],
                b: [4, 5, 6],
                c: [7, 8, 9]
            };
            const filterFn = value => value > 5;
            const result = filterObjectMap(obj, filterFn);

            expect(result).toEqual({
                b: [6],
                c: [7, 8, 9]
            });
        });

        test('should return an empty object if no items match the filter', () => {
            const obj = {
                a: [1, 2, 3],
                b: [4, 5, 6],
                c: [7, 8, 9]
            };
            const filterFn = value => value > 10;
            const result = filterObjectMap(obj, filterFn);

            expect(result).toEqual({});
        });

        test('should handle an empty object correctly', () => {
            const obj = {};
            const filterFn = value => value > 5;
            const result = filterObjectMap(obj, filterFn);

            expect(result).toEqual({});
        });

        test('should handle objects with empty arrays correctly', () => {
            const obj = {
                a: [],
                b: [4, 5, 6],
                c: []
            };
            const filterFn = value => value > 5;
            const result = filterObjectMap(obj, filterFn);

            expect(result).toEqual({
                b: [6]
            });
        });
    });
});

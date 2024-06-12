import handleError from './errorHandler';

describe('errorHandler (useFetch dependency)', () => {
    // spy on to verify the call, but mock to avoid a noisy console
    const errorLogSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

    const expectErrorLog = expectedLog => {
        const foundErrorLog = errorLogSpy.mock.calls.some(call =>
            call.some(
                arg => typeof arg === 'string' && arg.includes(expectedLog)
            )
        );
        expect(foundErrorLog).toBeTruthy();
    };

    afterEach(() => jest.clearAllMocks());

    test('should handle simple text-only error responses', () => {
        const mockErrorResponse = 'something here';
        expect(handleError(400, mockErrorResponse)).toEqual([
            mockErrorResponse
        ]);
        expectErrorLog('400: something here');
    });

    test('should handle Kestral error responses', () => {
        const mockErrorResponse = {
            errors: [['error one'], ['error two'], ['error three']]
        };

        expect(handleError(400, mockErrorResponse)).toEqual([
            'error one',
            'error two',
            'error three'
        ]);
        expectErrorLog('400: error one, error two, and error three');
    });

    test('should not handle Kestral style error responses with corrupted/incorrect error details', () => {
        const mockErrorResponse = {
            errors: [[''], [null], [undefined]]
        };

        let error;
        try {
            handleError(400, mockErrorResponse);
        } catch (e) {
            error = e;
        }

        expect(error.message).toBe(
            "Cannot read properties of null (reading 'replace')"
        );
    });
});

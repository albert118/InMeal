import { useFetch } from './useFetch';
import defaultRequestOptions from './defaultRequestOptions';
import handleError from './errorHandler';

jest.mock('./errorHandler');

describe('useFetch hook', () => {
    beforeEach(() => (global.fetch = jest.fn()));
    afterEach(() => jest.clearAllMocks());

    describe('HTTP verbs', () => {
        const mockResponse = (status, statusText, response) => {
            return {
                status,
                statusText,
                ok: status >= 200 && status < 300,
                text: () => Promise.resolve(JSON.stringify(response))
            };
        };

        test('getApi method fetches data successfully', async () => {
            global.fetch.mockResolvedValue(
                mockResponse(200, 'OK', { data: 'test' })
            );

            const { result } = renderHook(() => useFetch());

            const data = await result.current.getApi('/test-url');

            expect(data).toEqual({ data: 'test' });
            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                ...defaultRequestOptions,
                method: 'GET'
            });
        });

        test('postApi method fetches data successfully', async () => {
            global.fetch.mockResolvedValue(
                mockResponse(200, 'OK', { data: 'test' })
            );

            const { result } = renderHook(() => useFetch());

            const data = await result.current.postApi('/test-url', {
                key: 'value'
            });

            expect(data).toEqual({ data: 'test' });
            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                ...defaultRequestOptions,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'value' })
            });
        });

        test('patchApi method fetches data successfully', async () => {
            global.fetch.mockResolvedValue(
                mockResponse(200, 'OK', { data: 'test' })
            );

            const { result } = renderHook(() => useFetch());

            const data = await result.current.patchApi('/test-url', {
                key: 'value'
            });

            expect(data).toEqual({ data: 'test' });
            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                ...defaultRequestOptions,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'value' })
            });
        });

        test('deleteApi method fetches data successfully', async () => {
            global.fetch.mockResolvedValue(
                mockResponse(200, 'OK', { data: 'test' })
            );

            const { result } = renderHook(() => useFetch());

            const data = await result.current.deleteApi('/test-url');

            expect(data).toEqual({ data: 'test' });
            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                ...defaultRequestOptions,
                method: 'DELETE'
            });
        });
    });

    describe('responses handling', () => {
        const mockResponse = responseText => ({
            ok: true,
            statusText: 'doesnt matter',
            text: () => Promise.resolve(responseText)
        });

        test('handles JSON body', async () => {
            global.fetch.mockResolvedValue(mockResponse('{"some":"details"}'));

            const { result } = renderHook(() => useFetch());
            const data = await result.current.getApi('/test-url');

            expect(data).toEqual({
                some: 'details'
            });
        });

        test('handles non-JSON', async () => {
            global.fetch.mockResolvedValue(mockResponse('regular text'));

            const { result } = renderHook(() => useFetch());
            const data = await result.current.getApi('/test-url');

            expect(data).toBe('regular text');
        });
    });

    describe('error handling', () => {
        const mockResponse = responseText => ({
            ok: false,
            statusText: 'doesnt matter',
            text: () => Promise.resolve(responseText)
        });

        test('handles invalid JSON in response body', async () => {
            // Arrange
            global.fetch.mockResolvedValue(
                mockResponse(true, 'OK', 'invalid JSON')
            );

            const expectedErrorDetail = 'this is an expected error';
            const mockedErrorHandler = jest.mocked(handleError);
            mockedErrorHandler.mockReturnValue(expectedErrorDetail);

            // Act
            let output;
            try {
                const { result } = renderHook(() => useFetch());
                await result.current.getApi('/test-url');
            } catch (e) {
                output = e;
            }

            // Assert
            expect(output).toBe(expectedErrorDetail);
        });
    });
});

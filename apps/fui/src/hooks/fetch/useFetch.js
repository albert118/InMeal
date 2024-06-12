import defaultRequestOptions from './defaultRequestOptions';
import useLoadingStateDecoration from './useLoadingDecorator';
import handleError from './errorHandler';

export function useFetch() {
    function get(url) {
        return fetch(url, {
            ...defaultRequestOptions,
            method: 'GET'
        }).then(handleResponse);
    }

    function post(url, body) {
        return fetch(url, {
            ...defaultRequestOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(handleResponse);
    }

    function patch(url, body) {
        return fetch(url, {
            ...defaultRequestOptions,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(handleResponse);
    }

    function _delete(url) {
        return fetch(url, {
            ...defaultRequestOptions,
            method: 'DELETE'
        }).then(handleResponse);
    }

    // decorate methods with loading state
    const { decoratedMethod: getApi } = useLoadingStateDecoration(get);
    const { decoratedMethod: postApi } = useLoadingStateDecoration(post);
    const { decoratedMethod: patchApi } = useLoadingStateDecoration(patch);
    const { decoratedMethod: deleteApi } = useLoadingStateDecoration(_delete);

    return {
        getApi,
        postApi,
        patchApi,
        deleteApi
    };
}

// helpers

function handleResponse(response) {
    return response.text().then(text => {
        let data;

        try {
            data = text && JSON.parse(text);
        } catch (ex) {
            // wasn't JSON, a simple string was returned
            data = text;
        }

        if (!response.ok) {
            const errorDetail = handleError(response.statusText, data);
            console.log('errorDetail', errorDetail);
            return Promise.reject(errorDetail);
        }

        return data;
    });
}

import defaultRequestOptions from './defaultRequestOptions';
import useLoadingStateDecoration from './useLoadingDecorator';

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

	// decorate methods with loading state
	const { decoratedMethod: getApi } = useLoadingStateDecoration(get);
	const { decoratedMethod: postApi } = useLoadingStateDecoration(post);

	return {
		getApi,
		postApi
	};
}

// helpers

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			handleError(error);
			return Promise.reject(error);
		}

		return data;
	});
}

function handleError(errorResponseBody) {
	console.error(errorResponseBody);
	return errorResponseBody;
}

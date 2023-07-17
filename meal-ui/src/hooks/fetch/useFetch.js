import defaultRequestOptions from './defaultRequestOptions';
import useDecorate from './useLoadingDecorator';

export function useFetch() {
	function get(url) {
		return fetch(url, {
			...defaultRequestOptions,
			method: 'GET'
		}).then(handleResponse);
	}

	// decorate methods
	const { decoratedMethod: getApi } = useDecorate(get);

	return {
		getApi
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

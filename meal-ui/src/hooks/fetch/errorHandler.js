import { objectMap } from 'utils';

export default function handleError(status, errorResponse) {
	const unpackedErrors =
		typeof errorResponse === 'object' ? unpackKestralErrorResponse(errorResponse) : errorResponse;
	console.error(`${status}: ${stringifyErrorArray(unpackedErrors)}`);
	return unpackedErrors;
}

function unpackKestralErrorResponse(errorResponse) {
	if (!errorResponse?.errors) return [];

	// error details are returned as an array (if more than one validation throws per attribute)
	// we don't throw multiple so it's fine to select the first element
	return objectMap(errorResponse.errors, (_, detail) => formatError(detail[0]));
}

function stringifyErrorArray(errors) {
	return errors
		.slice(0, -1)
		.join(', ')
		.concat(', and ', errors[errors.length - 1]);
}

function formatError(errorString) {
	return (
		errorString
			// parse two groups of either any lower case charactes followed by any uppercase characters
			// then insert a space between both captured groups
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			// remove fullstops
			.replace(/[.]/g, '')
			.toLowerCase()
	);
}

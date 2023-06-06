const formatError = errorString => {
	return (
		errorString
			// parse two groups of either any lower case charactes followed by any uppercase characters
			// then insert a space between both captured groups
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			// remove fullstops
			.replace(/[.]/g, '')
			.toLowerCase()
	);
};

export default function errorHandler(errorResponseBody) {
	let retVal;

	if (
		Object.hasOwn(errorResponseBody, 'errors') &&
		typeof errorResponseBody.errors === 'object'
	) {
		retVal = Object.values(errorResponseBody.errors).map(e =>
			formatError(e[0])
		);
		// parse any CamelCase type names to readable strings and force lower case errors
	}

	return retVal;
}

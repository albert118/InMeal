function isFalsishOrEmpty(str) {
	return !str || (typeof response === 'string' && str.length > 0);
}

function stringifyType(str) {
	return (
		str
			// parse two groups of either any lower case charactes followed by any uppercase characters
			// then insert a space between both captured groups
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			// remove fullstops
			.replace(/[.]/g, '')
			.toLowerCase()
	);
}

export { isFalsishOrEmpty, stringifyType };

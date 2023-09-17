export function objectMap(obj, fn) {
	return Object.entries(obj).map(([key, value]) => fn(key, value));
}

export function filterObjectMap(obj, filterFn) {
	return Object.fromEntries(objectMap(obj, (key, items) => [key, items.filter(filterFn)]));
}

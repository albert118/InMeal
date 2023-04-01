export function objectMap(obj, fn) {
	return Object.entries(obj).map(([key, value]) => fn(key, value));
}

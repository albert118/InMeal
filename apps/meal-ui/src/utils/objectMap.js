export function objectMap(obj, fn) {
    return Object.entries(obj).map(([key, value]) => fn(key, value));
}

export function filterObjectMap(obj, filterFn) {
    const filtered = objectMap(obj, (key, items) => {
        const filteredValues = items.filter(filterFn);
        return filteredValues?.length > 0 ? [key, filteredValues] : null;
    }).filter(v => !!v);
    return Object.fromEntries(filtered);
}

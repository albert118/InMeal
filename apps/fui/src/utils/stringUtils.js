function isFalsishOrEmpty(str) {
    return !str || (typeof str === 'string' && str.trim().length === 0);
}

function stringifyType(str) {
    return (
        str
            // Insert a space between any lowercase letter or digit followed by an uppercase letter
            .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
            // Insert a space between consecutive uppercase letters followed by a lowercase letter
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
            // Remove full stops
            .replace(/[.]/g, '')
            .toLowerCase()
    );
}

export { isFalsishOrEmpty, stringifyType };

import { isFalsishOrEmpty, objectMap, stringifyType } from 'utils';

export default function handleError(status, errorResponse) {
    const unpackedErrors =
        typeof errorResponse === 'object'
            ? unpackKestralErrorResponse(errorResponse)
            : [errorResponse];

    console.error(`${status}: ${stringifyErrorArray(unpackedErrors)}`);
    return unpackedErrors;
}

function unpackKestralErrorResponse(errorResponse) {
    if (!errorResponse?.errors) return [];

    // error details are returned as an array (if more than one validation throws per attribute)
    // we don't throw multiple so it's fine to select the first element
    return objectMap(errorResponse.errors, (_, detail) =>
        stringifyType(detail[0])
    );
}

function stringifyErrorArray(errors) {
    return errors.length === 1
        ? isFalsishOrEmpty(errors[0])
            ? 'no error details'
            : errors[0]
        : errors
              .slice(0, -1)
              .join(', ')
              .concat(', and ', errors[errors.length - 1]);
}

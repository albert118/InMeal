import { useState, createContext } from 'react';

export const ErrorDetailContext = createContext({
    error: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setError: () => {}
});

export function useErrorDetail() {
    const [error, setError] = useState(null);
    return { error, setError };
}

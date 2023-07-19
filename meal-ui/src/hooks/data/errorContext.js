import { createContext, useState } from 'react';

export const ErrorDetailContext = createContext({
	error: null,
	setError: () => {}
});

export function useErrorDetail() {
	const [error, setError] = useState(null);
	return { error, setError };
}

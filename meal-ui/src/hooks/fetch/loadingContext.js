import { useState, createContext } from 'react';

export const LoadingContext = createContext({
    isLoading: false,
    setLoading: () => {}
});

export function useLoadingState() {
    const [isLoading, setLoading] = useState(false);
    return { isLoading, setLoading };
}

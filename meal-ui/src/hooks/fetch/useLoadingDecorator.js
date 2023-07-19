import { useContext } from 'react';
import { ErrorDetailContext } from 'hooks/data';
import { LoadingContext } from './loadingContext';

export default function useLoadingStateDecoration(fn) {
	const { setError } = useContext(ErrorDetailContext);
	const { setLoading } = useContext(LoadingContext);

	const decoratedMethod = (...args) => {
		setLoading(true);
		setError(null); // clear errors on reloading data
		const result = fn(...args);
		setLoading(false);

		return result;
	};

	return { decoratedMethod };
}

import { useState } from 'react';

export default function useLoadingStateDecoration(fn) {
	const [isLoading, setLoading] = useState(false);

	const decoratedMethod = (...args) => {
		setLoading(true);
		const result = fn(...args);
		setLoading(false);

		return result;
	};

	return { decoratedMethod, isLoading };
}

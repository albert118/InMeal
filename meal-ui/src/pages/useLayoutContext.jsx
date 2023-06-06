import { useState, useMemo, useCallback } from 'react';
import { DefaultLayoutContext } from 'types/DefaultLayoutContext';

/**
 * Create a layout context that child pages/components can share
 * This primarily shares the loading state management across multiple pages, allowing them to hook into a common page-loading spinner
 * @return   {Object} layoutContextValue    the layoutcontext value
 * @return {Function} layoutState   		a setState shim (layoutState) to toggle the loading flag
 */
export function useLayoutContext() {
	const [layoutState, setLayoutState] = useState(DefaultLayoutContext);

	const setIsLoading = useCallback(flag => {
		setLayoutState({ ...DefaultLayoutContext, isLoading: flag });
	}, []);

	const layoutContextValue = useMemo(
		() => ({
			layoutState,
			setIsLoading
		}),
		[layoutState, setIsLoading]
	);

	return { layoutContextValue, layoutState };
}

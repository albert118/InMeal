import { useState, useMemo, useCallback } from 'react';
import { DefaultLayoutContext } from 'types/DefaultLayoutContext';

const NOFLICKERLOADINGDELAY_MS = 300;

/**
 * Create a layout context that child pages/components can share
 * This primarily shares the loading state management across multiple pages, allowing them to hook into a common page-loading spinner
 * @return   {Object} layoutContextValue    the layoutcontext value
 * @return {Function} layoutState   		a setState shim (layoutState) to toggle the loading flag
 */
export function useLayoutContext() {
	const [layoutState, setLayoutState] = useState(DefaultLayoutContext);

	const setIsLoading = useCallback(flag => {
		// create a small delay to avoid "instant" loads or fast toggles flickering the screen
		// this context and method are intended for use on the container level per page, individual or non-blocking API calls
		// should avoid hooking into this and move as-fast-as-possible
		setTimeout(() => {}, NOFLICKERLOADINGDELAY_MS);
		console.log(`set isLoading '${flag}' from '${layoutState.isLoading}'`);
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

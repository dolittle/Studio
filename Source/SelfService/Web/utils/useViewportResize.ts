// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect } from 'react';

/**
 * Adds a listener to the `window.visualViewport:resize` event, that re-dispatches a `window:resize`.
 * Some components that we use (e.g. Vega graphs) use the `window:resize` event to update their own size.
 * The `window:resize` event is not triggered when a scrollbar is shown or hidden, causing their size to be wrong
 * when DOM elements are added later making a scrollbar appear. This re-dispatching fixes that issue.
 * If this issue is ever fixed: https://github.com/vega/vega-lite/issues/8447, we can probably remove this workaround.
 */
export const useViewportResize = (): void => {
    useEffect(() => {
        if (window.visualViewport === null) return;

        let lastSeenHeight = window.innerHeight;
        let lastSeenWidth = window.innerWidth;

        const listener = (_: Event) => {
            const windowResized = lastSeenHeight !== window.innerHeight || lastSeenWidth !== window.innerWidth;

            lastSeenHeight = window.innerHeight;
            lastSeenWidth = window.innerWidth;

            if (!windowResized) {
                const event = new Event(
                    'resize',
                    {
                        bubbles: false,
                        cancelable: false,
                        composed: false,
                    });

                window.dispatchEvent(event);
            }
        };

        window.visualViewport.addEventListener('resize', listener);
        return () => window.visualViewport?.removeEventListener('resize', listener);
    }, [window.visualViewport]);
};

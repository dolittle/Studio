// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useMemo, useRef, RefObject } from 'react';
import useResizeObserver, { UseResizeObserverCallback } from '@react-hook/resize-observer';
import { FitAddon } from 'xterm-addon-fit';

export type Resize = {
    /**
     * The callback-ref that should be used to attach the terminal to a DOM element.
     */
    readonly containerRef: RefObject<HTMLDivElement>;
};

/**
 * Attaches a ResizeObserver to the container DOM element to ensure that the Terminal size is recomputed when the container changes.
 * @param fit The {@link FitAddon} to call when the size needs to be recomputed.
 */
export const useResize = (fit: FitAddon): Resize => {
    const containerRef = useRef<HTMLDivElement>(null);

    const callback = useMemo<UseResizeObserverCallback>(() => {
        let timeout: number | undefined;
        return () => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                fit.fit();
            }, 200);
        };
    }, [fit]);

    useResizeObserver(containerRef, callback);

    return { containerRef };
};

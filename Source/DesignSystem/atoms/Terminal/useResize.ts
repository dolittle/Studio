// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect } from 'react';
import { FitAddon } from 'xterm-addon-fit';

/**
 * Attaches event listeners to the DOM to ensure that the Terminal size is recomputed when the container changes.
 * @param fit The {@link FitAddon} to call when the size needs to be recomputed.
 */
export const useResize = (fit: FitAddon) => {
    useEffect(() => {
        let resizeTimeout: number | undefined;
        const resizeOnWindowChange = () => {
            window.clearTimeout(resizeTimeout);
            window.setTimeout(() => fit.fit(), 500);
        };

        // TODO: We probably want to do this on the element itself, not only on window resize.
        window.addEventListener('resize', resizeOnWindowChange);
        return () => window.removeEventListener('resize', resizeOnWindowChange);
    }, []);
};

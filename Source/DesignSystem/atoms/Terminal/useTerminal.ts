// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, RefCallback } from 'react';
import { ITerminalOptions, Terminal as XTerminal } from 'xterm';
import 'xterm/css/xterm.css';
import { CanvasAddon } from 'xterm-addon-canvas';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';

export type Terminal = {
    readonly instance: XTerminal;
    readonly containerRef: RefCallback<HTMLDivElement>;
};

/**
 * Creates a new XTerm terminal instance that can be opened in a container DOM element.
 * The terminal will use either a WebGL renderer if available, or a Canvas renderer as a fallback.
 * The terminal will also resize automatically when its parent element changes size.
 * @param options The options to set on the XTerm terminal.
 * @returns A reference to the created terminal, and the ref-callback to pass to the container element.
 */
export const useTerminal = (options: ITerminalOptions): Terminal => {
    const ref = useRef<Terminal>();
    if (ref.current === undefined) {
        const instance = new XTerminal({
            ...options,
            allowProposedApi: true,
        });
        const containerRef = createRefCallback(instance);

        ref.current = { instance, containerRef };
    }

    useEffect(() => {
        if (ref.current === undefined) return;
        ref.current.instance.options = options;
    }, [ref.current, options]);

    return ref.current;
};

const createRefCallback = (term: XTerminal): RefCallback<HTMLDivElement> => {
    const fit = new FitAddon();

    let resizeTimeout: number | undefined;
    const resizeOnWindowChange = () => {
        window.clearTimeout(resizeTimeout);
        window.setTimeout(() => fit.fit(), 500);
    };

    return (container) => {
        if (container === null) {
            term.dispose();
            window.removeEventListener('resize', resizeOnWindowChange);
            return;
        };

        term.loadAddon(fit);
        term.open(container);
        fit.fit();
        window.addEventListener('resize', resizeOnWindowChange); // TODO: We probably want to do this on the element itself, not only on window resize.

        try {
            term.loadAddon(new WebglAddon());
        } catch {
            term.loadAddon(new CanvasAddon());
        }
    };
};

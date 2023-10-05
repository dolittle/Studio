// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, RefCallback } from 'react';
import { ITerminalOptions, Terminal as XTerminal } from 'xterm';
import 'xterm/css/xterm.css';
import { CanvasAddon } from 'xterm-addon-canvas';
import { FitAddon } from 'xterm-addon-fit';
import { WebglAddon } from 'xterm-addon-webgl';

/**
 * The instances that can be used to interact with an xterm.js Terminal attached to the DOM.
 */
export type Terminal = {
    /**
     * The actual Terminal instance.
     */
    readonly xterm: XTerminal;

    /**
     * The {@link FitAddon} that is loaded in the terminal, this can be used to recalculate the size of the terminal when needed.
     */
    readonly fit: FitAddon;

    /**
     * A promise that will be resolved when the terminal is first attached to the DOM - and initial size calculation has been performed.
     */
    readonly opened: Promise<XTerminal>;

    /**
     * The callback-ref that should be used to attach the terminal to a DOM element.
     */
    readonly containerRef: RefCallback<HTMLDivElement>;
};

/**
 * Creates a new xterm.js Terminal that can be attached to a DOM container element using the provided callback-ref.
 * It will immediately be available, and attached to the DOM when the conatiner is ready.
 * @param options The xterm.js {@link ITerminalOptions} to set on the terminal.
 * @returns A {@link Terminal} with references to the actual terminal and other things.
 */
export const useXTerm = (options: ITerminalOptions): Terminal => {
    const ref = useRef<Terminal>();
    if (ref.current === undefined) {
        const xterm = new XTerminal({
            ...options,
            allowProposedApi: true,
        });

        const fit = new FitAddon();
        xterm.loadAddon(fit);

        let resolveOpen: (value: XTerminal) => void;
        const opened = new Promise<XTerminal>((resolve) => resolveOpen = resolve);

        const containerRef = createRefCallback(xterm, fit, resolveOpen!);

        ref.current = { xterm, fit, opened, containerRef };
    }

    useEffect(() => {
        if (ref.current === undefined) return;
        ref.current.xterm.options = options;
    }, [ref.current, options]);

    return ref.current;
};

const createRefCallback = (xterm: XTerminal, fit: FitAddon, resolve: (value: XTerminal) => void): RefCallback<HTMLDivElement> =>
    (container) => {
        if (container === null) {
            try {
                xterm.dispose();
            } catch (error) {
                // There doesn't seem to be a way to unload the WebglAddon - and disposing of it throws an exception.
                // For now, we can't really don anythin but catch the error, and allow any resources that are still kept to leak :(
                console.warn('Could not dispose of XTerm', error);
            }
            return;
        };

        xterm.open(container);
        fit.fit();

        try {
            xterm.loadAddon(new WebglAddon());
        } catch {
            xterm.loadAddon(new CanvasAddon());
        }

        resolve(xterm);
    };

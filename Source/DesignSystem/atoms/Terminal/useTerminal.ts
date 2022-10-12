// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useRef, RefCallback } from 'react';
import { IDisposable, Terminal as XTerminal } from 'xterm';
import 'xterm/css/xterm.css';
import { CanvasAddon } from 'xterm-addon-canvas';
import { WebglAddon } from 'xterm-addon-webgl';

export type Terminal = {
    readonly instance: XTerminal;
    readonly readable: ReadableStream<string>;
    readonly writable: WritableStream<string>;
    readonly containerRef: RefCallback<HTMLDivElement>;
};

export const useTerminal = (): Terminal => {
    const ref = useRef<Terminal>();
    if (ref.current === undefined) {
        const instance = new XTerminal({
            allowProposedApi: true,
        });

        const readable = createReadable(instance);
        const writable = createWritable(instance);
        const containerRef = createRefCallback(instance);

        ref.current = { instance, readable, writable, containerRef };
    }

    return ref.current;
};

const createRefCallback = (term: XTerminal): RefCallback<HTMLDivElement> =>
    (container) => {
        if (container === null) {
            term.dispose();
            return;
        };

        term.open(container);

        try {
            term.loadAddon(new WebglAddon());
        } catch {
            term.loadAddon(new CanvasAddon());
        }
    };

const createReadable = (term: XTerminal): ReadableStream<string> => {
    let listener: IDisposable | undefined;

    return new ReadableStream<string>({
        start(controller) {
            listener = term.onData((chunk) => {
                controller.enqueue(chunk);
            });
        },
        cancel() {
            listener?.dispose();
        }
    });
};

const createWritable = (term: XTerminal): WritableStream<string> => {
    return new WritableStream<string>({
        write(chunk) {
            return new Promise(resolve => {
                term.write(chunk, resolve);
            });
        },
    });
};

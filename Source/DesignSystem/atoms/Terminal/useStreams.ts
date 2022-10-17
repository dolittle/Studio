// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect } from 'react';

import { InputMessages, OutputMessages } from './messages';
import { Terminal } from './useTerminal';

/**
 * The streams to be used to interact with an XTerm terminal.
 */
export type TerminalStreams = {
    /**
     * The stream that the terminal will use to write input messages to.
     */
    input: WritableStream<InputMessages>;

    /**
     * The stream that the terminal will use to read output messages from.
     */
    output: ReadableStream<OutputMessages>;
};

/**
 * Attaches {@link TerminalStreams} to a XTerm terminal.
 * @param streams The streams to use for reading and writing with the terminal.
 * @param terminal The XTerm terminal instance to attach the streams to.
 */
export const useStreams = (streams: TerminalStreams, terminal: Terminal) => {
    useEffect(() => {
        const writer = streams.input.getWriter();

        const dataListener = terminal.instance.onData((data) => {
            writer.write({ type: 'input', data }).catch(() => {});
        });
        const resizeListener = terminal.instance.onResize(({ cols, rows }) => {
            writer.write({ type: 'resize', columns: cols, rows }).catch(() => {});
        });

        return () => {
            dataListener.dispose();
            resizeListener.dispose();
            writer.close();
        };
    }, [streams.input]);

    useEffect(() => {
        const reader = streams.output.getReader();

        (async () => {
            try {
                while (true) {
                    const message = await reader.read();
                    if (message.done) return;

                    switch (message.value.type) {
                        case 'output':
                            terminal.instance.write(message.value.data);
                            break;
                        default:
                            console.warn('Unhandled terminal output message', message.value);
                    }

                }
            } catch (error) {
                if (error instanceof TypeError) return;
                console.error('Terminal read error', error);
            }
        })();

        return () => {
            reader.cancel();
        };
    }, [streams.output]);
};

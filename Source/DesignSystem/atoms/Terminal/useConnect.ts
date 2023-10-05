// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef } from 'react';
import { IDisposable, Terminal } from 'xterm';

import { InputMessages, OutputMessages } from './messages';

/**
 * The streams to be used to interact with an xterm.js terminal.
 */
export type TerminalStreams = {
    /**
     * The stream that the terminal should use to write input messages to.
     */
    input: WritableStream<InputMessages>;

    /**
     * The stream that the terminal should use to read output messages from.
     */
    output: ReadableStream<OutputMessages>;
};

/**
 * The options available to a {@link TerminalConnect} callback.
 */
export type ConnectOptions = {
    /**
     * The current width of the terminal in columns.
     */
    columns: number;

    /**
     * The current height of the terminal in columns.
     */
    rows: number;

    /**
     * A signal that will be aborted if the connection attempt should be stopped.
     */
    signal: AbortSignal;
};

/**
 * Defines the signature of the callback that will be used to initiate a new connection to a TTY.
 */
export type TerminalConnect = (options: ConnectOptions) => Promise<TerminalStreams>;

/**
 * Uses the provided callback to initiate a new connection to a TTY - and attach the inputs and outputs.
 * If the connection fails or is lost, it will prompt the terminal for a reconnnect attempt.
 * If the callback is changed, the old connection will be dropped - and a new one will be initiated.
 * @param opened The promise that will be resolved when the terminal is properly attached to the DOM.
 * @param callback The callback to use to initiate a new connection to a TTY.
 */
export const useConnect = (opened: Promise<Terminal>, callback: TerminalConnect) => {
    const connecting = useRef(opened);

    useEffect(() => {
        const abort = new AbortController();
        const current = connecting.current;
        connecting.current = connectLoop(current, callback, abort.signal).catch(_ => current);
        return () => abort.abort();
    }, [callback]);
};

const connectLoop = async (previous: Promise<Terminal>, callback: TerminalConnect, signal: AbortSignal): Promise<Terminal> => {
    const term = await previous;

    try {
        const streams = await callback({
            columns: term.cols,
            rows: term.rows,
            signal,
        });

        signal.throwIfAborted();

        await pipeLoop(term, streams, signal);
    } catch (error) {
        signal.throwIfAborted();
        await promptForEnter(term, signal, 'Connection failed, press enter to try again ...');
    }

    signal.throwIfAborted();
    return connectLoop(previous, callback, signal);
};

const pipeLoop = async (term: Terminal, streams: TerminalStreams, signal: AbortSignal): Promise<void> => {
    let reader: ReadableStreamDefaultReader<OutputMessages> | undefined;
    let writer: WritableStreamDefaultWriter<InputMessages> | undefined;
    let inputListener: IDisposable | undefined;
    let resizeListener: IDisposable | undefined;

    try {
        reader = streams.output.getReader();
        writer = streams.input.getWriter();

        inputListener = term.onData((data) =>
            writer!.write({ type: 'input', data })
        );
        resizeListener = term.onResize(({ cols, rows }) =>
            writer!.write({ type: 'resize', columns: cols, rows })
        );

        signal.addEventListener('abort', () => reader!.cancel());

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            switch (value.type) {
                case 'output':
                    term.write(value.data);
                    break;
            }
        }

        inputListener.dispose();
        resizeListener.dispose();

        await promptForEnter(term, signal, 'Connection lost, press enter to reconnect ...');
    } catch (error) {
        signal.throwIfAborted();
        await promptForEnter(term, signal, 'Connection lost, press enter to reconnect ...');
    } finally {
        if (!reader?.closed) reader?.cancel();
        if (!writer?.closed) writer?.close();
        inputListener?.dispose();
        resizeListener?.dispose();
    }
};

const promptForEnter = (term: Terminal, signal: AbortSignal, prompt: string): Promise<void> =>
    new Promise<void>((resolve, reject) =>
        term.write(`\r\n\x1B[31m${prompt}\x1B[0m\r\n`, () => {
            const abort = () => {
                listener.dispose();
                signal.removeEventListener('abort', abort);
                reject();
            };
            const listener = term.onData((data) => {
                if (data === '\r') {
                    listener.dispose();
                    signal.removeEventListener('abort', abort);
                    resolve();
                }
            });
            signal.addEventListener('abort', abort);
        })
    );

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InputMessages, OutputMessages, TerminalStreams } from '@dolittle/design-system';

import { WebSocketConnection, WebSocketCloseInfo, WebSocketStream } from './websocket';

export const isAvailable = async (url: string): Promise<boolean> => {
    try {
        await fetchToken(url);
        return true;
    } catch {
        return false;
    }
};

export const connect = async (url: string, columns: number, rows: number, signal: AbortSignal): Promise<TerminalStreams> => {
    const token = await fetchToken(url);

    const { protocol, host } = window.location;
    const base = `${protocol === 'http:' ? 'ws:' : 'wss:'}//${host}`;

    const ws = new WebSocketStream(`${base}${url}/ws`, { protocols: ['tty'], signal });
    const connection = await ws.connection;
    signal.throwIfAborted();

    const { readable, writable } = encodeDecodeStrings(connection, signal);

    writeInitialMessage(writable, token, columns, rows);

    const input = transformInput(writable, ws.close);
    const output = transformOutput(readable, ws.closed);

    return { input, output };
};

const fetchToken = async (url: string): Promise<string> => {
    try {
        const response = await fetch(`${url}/token`);
        const { token } = await response.json();

        if (typeof token !== 'string') {
            throw new Error('Did not receive a token');
        }

        return token;
    } catch (error) {
        throw new Error(`Failed to fetch token ${error}`);
    }
};

const writeInitialMessage = (stream: WritableStream<string>, token: string, columns: number, rows: number) => {
    const writer = stream.getWriter();
    const message = JSON.stringify({ AuthToken: token, columns, rows });
    writer.write(message);
    writer.releaseLock();
};

const transformInput = (stream: WritableStream<string>, close: (info?: WebSocketCloseInfo) => void): WritableStream<InputMessages> => {
    const transformer = new TransformStream<InputMessages, string>({
        transform(message, controller) {
            switch (message.type) {
                case 'input':
                    controller.enqueue('0' + message.data);
                    break;
                case 'resize':
                    const { columns, rows } = message;
                    controller.enqueue('1' + JSON.stringify({ columns, rows }));
                    break;
                case 'pause':
                    controller.enqueue('2');
                    break;
                case 'resume':
                    controller.enqueue('3');
                    break;
                default:
                    console.warn('TTYD unknown message type', message);
            }
        },
    });

    transformer.readable.pipeTo(stream).catch(_ => { });
    return transformer.writable;
};

const transformOutput = (stream: ReadableStream<string>, closed: Promise<WebSocketCloseInfo>): ReadableStream<OutputMessages> => {
    const transformer = new TransformStream<string, OutputMessages>({
        start(controller) {
            closed.then(_ => controller.terminate());
        },
        transform(chunk, controller) {
            const cmd = chunk.slice(0, 1);
            const data = chunk.slice(1);

            switch (cmd) {
                case '0':
                    controller.enqueue({ type: 'output', data });
                    break;
                case '1':
                    controller.enqueue({ type: 'windowtitle', title: data });
                    break;
                case '2':
                    // Preferences
                    break;
                default:
                    console.warn('TTYD unknown command chunk', chunk);
            }
        },
    });

    stream.pipeTo(transformer.writable).catch(_ => { });
    return transformer.readable;
};

const encodeDecodeStrings = (connection: WebSocketConnection, signal: AbortSignal): { readable: ReadableStream<string>, writable: WritableStream<string> } => {
    const encoder = new TextEncoderStream();
    encoder.readable.pipeTo(connection.writable, { signal }).catch(_ => { });
    const writable = encoder.writable;

    const decoder = new TextDecoderStream();
    connection.readable
        .pipeThrough(new TransformStream<string | Uint8Array, BufferSource>({
            transform(chunk, controller) {
                if (chunk instanceof ArrayBuffer) {
                    controller.enqueue(chunk);
                } else if (chunk instanceof Blob) {
                    chunk.arrayBuffer().then(_ => controller.enqueue(_));
                } else if (chunk instanceof Uint8Array) {
                    controller.enqueue(chunk.buffer);
                } else {
                    console.warn('TTYD unknown chunk received', chunk);
                }
            },
        }))
        .pipeTo(decoder.writable, { signal }).catch(_ => { });
    const readable = decoder.readable;

    return { readable, writable };
};

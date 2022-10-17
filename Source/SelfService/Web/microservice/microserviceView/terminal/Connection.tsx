// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useCallback, useRef, useEffect, useMemo, useState, ReactElement } from 'react';

import { InputMessages, OutputMessages, TerminalStreams } from '@dolittle/design-system/atoms/Terminal';

import { connect } from './ttyd';

export type ConnectionProps = {
    url: string;
    render: (streams: TerminalStreams) => ReactElement;
};

export const Connection = (props: ConnectionProps) => {
    const [{ input, output }] = useState(() => ({
        input: new TransformStream<InputMessages, InputMessages>(),
        output: new TransformStream<OutputMessages, OutputMessages>(),
    }));

    const write = useMemo(() =>
        (data: string) => {
            const writer = output.writable.getWriter();
            return writer.write({ type: 'output', data }).finally(() => writer.releaseLock());
        }
        , [output]);

    const read = useMemo(() =>
        () => {
            const reader = input.readable.getReader();
            return reader.read().finally(() => reader.releaseLock());
        }
        , [input]);

    const clear = useMemo(() =>
        () => write('\x1B[H\x1B[2J')
        , [write]);

    const connectToServer = useMemo(() =>
        async () => {
            let connecting = true;
            await write('Connecting ...');

            const dots = window.setInterval(() => {
                if (!connecting) {
                    window.clearInterval(dots);
                    return;
                }
                write('.');
            }, 1000);

            try {
                const connection = await connect(props.url, 40, 10);
                connecting = false;
                await clear();

                const abort = new AbortController();
                connection.closed.finally(() => abort.abort());

                try {
                    await Promise.all([
                        connection.output.pipeTo(output.writable, {
                            signal: abort.signal,
                            preventAbort: true,
                            preventCancel: true,
                            preventClose: true,
                        }),
                        input.readable.pipeTo(connection.input, {
                            signal: abort.signal,
                            preventAbort: true,
                            preventCancel: true,
                            preventClose: true,
                        })
                    ]);
                    throw ConnectionLost;
                } catch {
                    throw ConnectionLost;
                }
            } catch (error) {
                if (error === ConnectionLost) throw error;

                connecting = false;
                throw FailedToConnect;
            }
        }
        , [props.url]);


    useEffect(() => {
        const reconnect = async () => {
            try {
                await connectToServer();
            } catch (error) {
                if (error === ConnectionLost) {
                    await write('\r\n\n\x1B[31mConnection was lost, press enter to reconnect...\x1B[0m');
                } else {
                    await write('\r\n\n\x1B[31mFailed to connect, press enter to try again...\x1B[0m');
                }

                while (true) {
                    const { done, value: message } = await read();
                    if (done) {
                        return;
                    }

                    if (message.type !== 'input' || message.data !== '\r') {
                        continue;
                    }

                    await write('\r\n');

                    reconnect();
                    return;
                }
            }
        };
        reconnect();
    }, [props.url]);

    return props.render({ input: input.writable, output: output.readable });
};

const FailedToConnect = Symbol.for('failed to connect');
const ConnectionLost = Symbol.for('connection lost');

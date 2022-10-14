// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef } from 'react';

import { Terminal } from './useTerminal';

export type ReadWriteStream<T = any, U = T> = {
    readonly readable: ReadableStream<T>;
    readonly writable: WritableStream<U>;
};

const DisposingAbort = Symbol.for('Aborting because pipe should be disposed');

export const useStreams = (streams: ReadWriteStream<string>, terminal: Terminal) => {
    const locks = useRef<{ streams: Promise<void>, terminal: Promise<void> }>();
    if (locks.current === undefined) {
        locks.current = {
            streams: Promise.resolve(),
            terminal: Promise.resolve(),
        };
    }

    useEffect(() => {
        const controller = new AbortController();
        const lock = locks.current!.streams;

        locks.current!.streams = lock.then(() => {
            if (controller.signal.aborted) return;

            return streams.readable.pipeTo(terminal.writable, {
                preventAbort: true,
                preventCancel: true,
                preventClose: true,
                signal: controller.signal,
            }).catch(err => {
                if (err === DisposingAbort) return;
                throw err;
            });
        });

        return () => controller.abort(DisposingAbort);
    }, [streams.readable, terminal.writable]);

    useEffect(() => {
        const controller = new AbortController();
        const lock = locks.current!.terminal;

        locks.current!.terminal = lock.then(() => {
            if (controller.signal.aborted) return;

            return terminal.readable.pipeTo(streams.writable, {
                signal: controller.signal,
                preventCancel: true,
            }).catch(err => {
                if (err === DisposingAbort) return;
                throw err;
            });
        });

        return () => controller.abort(DisposingAbort);
    }, [streams.writable, terminal.readable]);
};

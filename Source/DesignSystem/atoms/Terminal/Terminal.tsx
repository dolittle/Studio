// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useRef, RefCallback } from 'react';
import { Terminal as XTerminal } from 'xterm';
import 'xterm/css/xterm.css';

import { Box } from '@mui/material';

export type TerminalProps = {
    stream: TransformStream<string, string>;
};


export const Terminal = (props: TerminalProps) => {
    const { term, ref } = useTerminal();

    useEffect(() => {
        const writer = props.stream.writable.getWriter();
        const reader = props.stream.readable.getReader();

        const listener = term.onData((data) => {
            writer.write(data);
        });

        let stopped = false;
        const readChunk = () => reader.read()
            .then(({ value, done }) => {
                if (stopped || done || value === undefined) {
                    return;
                }
                term.write(value, () => {
                    readChunk();
                });
            })
            .catch((err) => {
                if (err instanceof TypeError && err.message === 'Releasing Default reader') {
                    return;
                }
                throw err;
            });
        readChunk();

        return () => {
            stopped = true;
            listener.dispose();
            writer.releaseLock();
            reader.releaseLock();
        };
    }, [props.stream]);

    return (
        <Box ref={ref} sx={{ height: '300px' }} />
    );
};

type TerminalRef = {
    term: XTerminal;
    ref: RefCallback<HTMLDivElement>;
};

const useTerminal = (): TerminalRef => {
    const ref = useRef<TerminalRef>();

    useEffect(() => {
        return () => ref.current?.term.dispose();
    }, []);

    if (ref.current === undefined) {
        const term = new XTerminal();

        ref.current = {
            term,
            ref: (container) => {
                if (container === null) return;
                term.open(container);
            }
        };
    }

    return ref.current;
};


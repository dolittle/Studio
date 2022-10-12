// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

import { useTerminal } from './useTerminal';
import { useStreams, ReadWriteStream } from './useStream';

export type TerminalProps = {
    streams: ReadWriteStream<string>;
};


export const Terminal = (props: TerminalProps) => {
    const terminal = useTerminal();
    useStreams(props.streams, terminal);

    return (
        <Box
            ref={terminal.containerRef}
            sx={{
                'height': '300px',
                '& .xterm .xterm-viewport': {
                    overscrollBehaviorY: 'none',
                },
            }}
        />
    );
};

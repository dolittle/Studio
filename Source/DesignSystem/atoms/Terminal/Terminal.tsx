// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { ITerminalOptions } from 'xterm';

import { useTheme, Box, SxProps, Theme } from '@mui/material';

import { mapTheme } from './mapTheme';
import { useConnect, TerminalConnect } from './useConnect';
import { useResize } from './useResize';
import { useXTerm } from './useXTerm';

/**
 * The props for a {@link Terminal} component.
 */
export type TerminalProps = {
    /**
     * The callback that will be called to initiate a new connection to a TTY.
     */
    connect: TerminalConnect;

    sx?: SxProps<Theme>;
};

/**
 * An XTerm terminal component.
 * @param props The {@link TerminalProps} for the component instance.
 * @returns The rendered {@link JSX.Element}.
 */
export const Terminal = (props: TerminalProps) => {
    const theme = useTheme();

    const options = useMemo<ITerminalOptions>(() => ({
        ...mapTheme(theme),
    }), [theme]);

    const { fit, opened, containerRef: xtermRef } = useXTerm(options);
    const { containerRef: resizeRef } = useResize(fit);
    useConnect(opened, props.connect);

    return (
        <Box
            ref={resizeRef}
            sx={props.sx}
        >
            <Box
                ref={xtermRef}
                sx={{
                    'width': '100%',
                    'height': '100%',
                    '& .xterm .xterm-viewport': {
                        overscrollBehaviorY: 'none',
                    },
                }}
            />
        </Box>
    );
};

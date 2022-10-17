// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import { ITerminalOptions } from 'xterm';

import { useTheme, Box } from '@mui/material';

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

    const { fit, opened, containerRef} = useXTerm(options);
    useResize(fit);
    useConnect(opened, props.connect);

    return (
        <Box
            ref={containerRef}
            sx={{
                'height': '300px',
                '& .xterm .xterm-viewport': {
                    overscrollBehaviorY: 'none',
                },
            }}
        />
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Box, SxProps, Theme } from '@mui/material';

import { ObservableLogLines } from './loki/logLines';
import { DataLabels } from './loki/types';

import { LogLine } from './logLine';
import { ColoredLine } from './lineParsing';
import { ShimmeringLogLines } from './shimmeringLogLines';

const showMicroserviceAndTimestampToClass = (showMicroservice?: boolean, showTimestamp?: boolean) =>
    showMicroservice === true && showTimestamp === true ? '' :
        showMicroservice === true ? 'hide-timestamp' :
            showTimestamp === true ? 'hide-microservice' :
                'hide-microservice hide-timestamp';

export type LogLinesProps = {
    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<ColoredLine>;

    /**
     * Whether or not to display the 'SHOW' context button for each line.
     */
    showContextButton?: boolean;

    /**
     * Whether or not to display the microservice column for each line.
     */
    showMicroservice?: boolean;

    /**
     * Whether or not to display the timestamp column for each line.
     */
    showTimestamp?: boolean;

    /**
     * The callback to call when a 'SHOW' context button is clicked.
     */
    onClickShowContextButton?: (timestamp: bigint, labels: DataLabels) => void;

    /**
     * Elements to add after the LogPanel title divider, just before any actual log lines.
     */
    header?: React.ReactNode;

    /**
     * Elements to add to the end of the LogPanel, just after all actual log lines.
     */
    footer?: React.ReactNode;

    sx?: SxProps<Theme>;
};

export const LogLines = (props: LogLinesProps) => {

    const lines = useMemo(() => props.logs.lines.map(line => (
        <LogLine
            key={line.timestamp.toString()}
            timestamp={line.timestamp}
            labels={line.labels}
            line={line.data}
            showContextButton={props.showContextButton}
            onClickShowLineContext={props.onClickShowContextButton}
        />
    )), [props.logs.lines, props.showContextButton]);

    return (
        <Box
            component='pre'
            sx={{
                'm': 0,
                'whiteSpace': 'pre-wrap',
                'typography': 'monospace',
                '&.hide-timestamp .log-line-timestamp': {
                    display: 'none',
                },
                '&.hide-microservice .log-line-microservice': {
                    display: 'none',
                },
                ...props.sx,
            }}
            className={showMicroserviceAndTimestampToClass(props.showMicroservice, props.showTimestamp)}
        >
            {props.header}
            {lines}
            {props.logs.loading &&
                <ShimmeringLogLines showContextButton={props.showContextButton} />
            }
            {props.footer}
        </Box>
    );
};

// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { Box, SxProps, Theme } from '@mui/material';

import { ObservableLogLines } from './loki/logLines';
import { DataLabels } from './loki/types';

import { formatTimestamp, LogLine } from './logLine';
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
     * Whether or not to display the start and end of the date range at the beginning and end of the lines.
     */
    showDateRangeHeaderAndFooter?: boolean;

    /**
     * The callback to call when a 'SHOW' context button is clicked.
     */
    onClickShowContextButton?: (timestamp: bigint, labels: DataLabels) => void;

    /**
     * Styling of the <pre> container of the log lines.
     */
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

    const startRangeHeader = props.logs.lines.length > 0 && props.showDateRangeHeaderAndFooter === true
        ? <Box sx={{ textAlign: 'center', pb: 1 }}>
            <b>Start of date range: {formatTimestamp(props.logs.lines[0].timestamp)}</b>
        </Box>
        : null;

    const endRangeFooter = props.logs.lines.length > 0 && props.showDateRangeHeaderAndFooter === true
        ? <Box sx={{ textAlign: 'center', pt: 1 }}>
            <b>End of date range: {formatTimestamp(props.logs.lines[props.logs.lines.length - 1].timestamp)}</b>
        </Box>
        : null;

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
            {startRangeHeader}
            {lines}
            {endRangeFooter}
            {props.logs.loading &&
                <ShimmeringLogLines showContextButton={props.showContextButton} />
            }
        </Box>
    );
};

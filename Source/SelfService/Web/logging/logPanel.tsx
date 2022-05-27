// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { Alert, AlertTitle, Box, Divider, FormControlLabel, FormGroup, Grid, Link, Paper, Switch } from '@mui/material';

import { ObservableLogLines } from './loki/logLines';

import { ColoredLine } from './lineParsing';
import { LogLine } from './logLine';
import { DataLabels } from './loki/types';


/**
 * The props for a {@link LogPanel} component.
 */
export type LogPanelProps = {
    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<ColoredLine>;

    /**
     * The title to render on the top of the panel.
     */
    title: React.ReactNode;

    /**
     * Whether or not to show the 'Show log line context' button.
     */
    enableShowLineContextButton: boolean;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    const [showTimestamp, setShowTimestamp] = useState(false);

    const handleOnClickShowLineContext = (timestamp: bigint, labels: DataLabels) => {
        alert(`Show context for ${JSON.stringify(labels)} around ${timestamp}`);
    };

    return (
        <Grid container spacing={2} sx={{ pt: 2 }}>
            {props.logs.failed
                ?
                <Grid item xs={12} md={6}>
                    <Alert severity='error' variant='outlined'>
                        <AlertTitle>Something went wrong</AlertTitle>
                        Please try again later. If the problem persists, please <Link href="mailto:support@dolittle.com">contact support</Link>.
                    </Alert>
                </Grid>
                :
                props.logs.lines.length === 0
                    ?
                    <Grid item xs={12} md={6}>
                        <Alert severity='info' variant='outlined'>
                            <AlertTitle>No logs found</AlertTitle>
                            Try adjusting the filters, or verify that your microservices are running.
                        </Alert>
                    </Grid>
                    :
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={10}>{props.title}</Grid>
                                <Grid item xs={12} md={1}>
                                    <FormGroup>
                                        <FormControlLabel
                                            label='Timestamp'
                                            control={<Switch
                                                checked={showTimestamp}
                                                onChange={(event) => setShowTimestamp(event.target.checked)}
                                            />}
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <Divider sx={{ borderColor: 'background.paper', m: 1 }} />
                            <Box
                                component='pre'
                                sx={{
                                    'm': 0,
                                    'whiteSpace': 'pre-wrap',
                                    'typography': 'monospace',
                                    '&.hide-timestamp div.log-line-timestamp': {
                                        display: 'none',
                                    },
                                }}
                                className={showTimestamp ? '' : 'hide-timestamp'}
                            >
                                {props.logs.lines.map(line =>
                                    <LogLine
                                        key={line.timestamp.toString()}
                                        timestamp={line.timestamp}
                                        labels={line.labels}
                                        line={line.data}
                                        enableShowLineContextButton={props.enableShowLineContextButton}
                                        onClickShowLineContext={handleOnClickShowLineContext}
                                    />
                                )}
                            </Box>
                        </Paper>
                    </Grid>
            }
        </Grid>
    );
};

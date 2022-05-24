// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Alert, AlertTitle, Box, Grid, Link, Paper } from '@mui/material';

import { ObservableLogLines } from './loki/logLines';

import { ColoredLine } from './lineParsing';
import { LogLine } from './logLine';


/**
 * The props for a {@link LogPanel} component.
 */
export type LogPanelProps = {
    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<ColoredLine>;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    return (
        <Grid container spacing={2} sx={{ pt: 2 }}>
            {props.logs.failed
                ?
                <Grid item xs={6}>
                    <Alert severity='error' variant='outlined'>
                        <AlertTitle>Something went wrong</AlertTitle>
                        Please try again later. If the problem persists, please <Link href="mailto:support@dolittle.com">contact support</Link>.
                    </Alert>
                </Grid>
                :
                props.logs.lines.length === 0
                    ?
                    <Grid item xs={6}>
                        <Alert severity='info' variant='outlined'>
                            <AlertTitle>No logs found</AlertTitle>
                            Try adjusting the filters, or verify that your microservices are running.
                        </Alert>
                    </Grid>
                    :
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Box component='pre' sx={{ m: 0, whiteSpace: 'break-space' }}>
                                {props.logs.lines.map(line => <LogLine key={line.timestamp} line={line.data} />)}
                            </Box>
                        </Paper>
                    </Grid>
            }
        </Grid>
    );
};

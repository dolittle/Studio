// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useCallback } from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    Link,
    Paper,
    Switch,
    Typography,
} from '@mui/material';

import { ObservableLogLines } from './loki/logLines';
import { DataLabels } from './loki/types';
import { QueryLabels } from './loki/queries';

import { LogFilterMicroservice, LogFilterObject } from './logFilter/logFilterPanel';
import { ColoredLine } from './lineParsing';
import { ShimmeringLogLines } from './shimmeringLogLines';
import { LogLines } from './logLines';

export const logPanelQueryLabels = (
    applicationId: string,
    environment: string,
    filters: LogFilterObject
): [QueryLabels, string[]] => {
    const labels = {
        job: 'microservice',
        application_id: applicationId,
        environment,
        microservice_id:
            filters.microservice !== undefined && filters.microservice.length > 0
                ? filters.microservice.map((_) => _.id)
                : undefined,
    };

    const pipeline = filters.searchTerms.map((term) => `|= "${term}"`);

    return [labels, pipeline];
};

/**
 * The props for a {@link LogPanel} component.
 */
export type LogPanelProps = {
    /**
     * The Application to the logs are for.
     */
    application: string;

    /**
     * The Environment to the logs are for.
     */
    environment: string;

    /**
     * The Environment to the logs are for.
     */
    microservices?: LogFilterMicroservice[];

    /**
     * The human readable description of what timespan the logs are displayed for.
     */
    timespan: string;

    /**
     * The retrieved logs to render.
     */
    logs: ObservableLogLines<ColoredLine>;

    /**
     * Whether or not to show the 'Show log line context' button.
     */
    enableShowLineContextButton?: boolean;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    const [showTimestamp, setShowTimestamp] = useState(false);
    const [showMicroservice, setShowMicroservice] = useState(false);

    const handleOnClickShowLineContext = useCallback(
        (timestamp: bigint, labels: DataLabels) => {
            alert(`Show context for ${JSON.stringify(labels)} around ${timestamp}`);
        },
        []
    );

    const showMicroserviceAndTimestamp = (
        showMicroservice: boolean,
        showTimestamp: boolean
    ) => {
        if (showMicroservice && showTimestamp) {
            return '';
        } else if (showMicroservice) {
            return 'hide-timestamp';
        } else if (showTimestamp) {
            return 'hide-microservice';
        } else {
            return 'hide-microservice-timestamp';
        }
    };

    if (props.logs.failed) {
        return (
            <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Alert severity='error' variant='outlined'>
                        <AlertTitle>Something went wrong</AlertTitle>
                        Please try again later. If the problem persists, please{' '}
                        <Link href='mailto:support@dolittle.com'>contact support</Link>.
                    </Alert>
                </Grid>
            </Grid>
        );
    }

    if (!props.logs.loading && props.logs.lines.length === 0) {
        return (
            <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Alert severity='info' variant='outlined'>
                        <AlertTitle>No logs found</AlertTitle>
                        Try adjusting the filters, or verify that your microservices are
                        running.
                    </Alert>
                </Grid>
            </Grid>
        );
    }

    const microservices =
        props.microservices === undefined || props.microservices?.length === 0
            ? 'all Microservices'
            : props.microservices?.length === 1
            ? `${props.microservices?.[0].name} Microservice`
            : `${props.microservices?.map((_) => _.name).join(', ')} Microservices`;

    const title = (
        <Typography variant='body2' color='textSecondary' fontStyle='italic' mt={1}>
            Displaying <b>{props.timespan}</b> for {props.application} Application,{' '}
            {props.environment} Environment, {microservices}
        </Typography>
    );

    return (
        <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10}>
                            {title}
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box display='flex' justifyContent='flex-end'>
                                <FormGroup>
                                    <FormControlLabel
                                        label='Microservice'
                                        control={
                                            <Switch
                                                checked={showMicroservice}
                                                onChange={(event) =>
                                                    setShowMicroservice(
                                                        event.target.checked
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <FormControlLabel
                                        label='Timestamp'
                                        control={
                                            <Switch
                                                checked={showTimestamp}
                                                onChange={(event) =>
                                                    setShowTimestamp(event.target.checked)
                                                }
                                            />
                                        }
                                    />
                                </FormGroup>
                            </Box>
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
                            '&.hide-microservice div.log-line-microservice': {
                                display: 'none',
                            },
                            '&.hide-microservice-timestamp div.log-line-microservice': {
                                display: 'none',
                            },
                            '&.hide-microservice-timestamp div.log-line-timestamp': {
                                display: 'none',
                            },
                        }}
                        className={showMicroserviceAndTimestamp(
                            showMicroservice,
                            showTimestamp
                        )}
                    >
                        <LogLines
                            lines={props.logs.lines}
                            showContextButtonInLines={
                                props.enableShowLineContextButton ?? false
                            }
                            onClickShowContextButton={handleOnClickShowLineContext}
                        />
                        {props.logs.loading && (
                            <ShimmeringLogLines
                                enableShowLineContextButton={
                                    props.enableShowLineContextButton ?? false
                                }
                            />
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useCallback } from 'react';
import { InView } from 'react-intersection-observer';
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

import { ObservableLogLines, ObservablePartialLogLines } from './loki/logLines';
import { DataLabels } from './loki/types';

import { LogFilterObject } from './logFilter/logFilterPanel';
import { ColoredLine } from './lineParsing';
import { LogLines } from './logLines';
import { LoadMoreLogs } from './logsInRange';
import { LogContextDialog, LogContextDialogState } from './logContexDialog';

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
     * The filters to apply to the logs query.
     */
    filters: LogFilterObject;

    /**
     * Whether or not automatic fetching of new lines when scrolling to the bottom should be enabled.
     */
    autoLoadMoreLogs?: boolean;

    /**
     * The fetched logs to display in the panel.
     */
    logs: ObservableLogLines<ColoredLine> | ObservablePartialLogLines<ColoredLine>;

    /**
     * The function to call to load more logs (if available).
     */
    loadMoreLogs?: LoadMoreLogs;
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    const [showTimestamp, setShowTimestamp] = useState(false);
    const [showMicroservice, setShowMicroservice] = useState(false);

    const [logContextDialog, setLogContextDialog] = useState<LogContextDialogState>({
        show: false,
        application: '',
        applicationId: '',
        environment: '',
        microservice: '',
        microserviceId: '',
        from: 0n,
        to: 0n,
    });

    const handleOnClickShowLineContext = useCallback(
        (timestamp: bigint, labels: DataLabels) =>
            setLogContextDialog({
                show: true,
                application: labels.application,
                applicationId: labels.application_id,
                environment: labels.environment,
                microservice: labels.microservice,
                microserviceId: labels.microservice_id,
                from: timestamp - 86_400_000_000_000n,
                to: timestamp,
            }),
        [setLogContextDialog]
    );

    const handleInViewChange = useCallback(
        (visible: boolean) => {
            if (visible && props.autoLoadMoreLogs === true) props.loadMoreLogs?.();
        },
        [props.autoLoadMoreLogs, props.loadMoreLogs]
    );

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
        props.filters.microservice === undefined ||
        props.filters.microservice?.length === 0
            ? 'all Microservices'
            : props.filters.microservice?.length === 1
            ? `${props.filters.microservice?.[0].name} Microservice`
            : `${props.filters.microservice
                  ?.map((_) => _.name)
                  .join(', ')} Microservices`;

    const title = (
        <Typography variant='body2' color='textSecondary' fontStyle='italic' mt={1}>
            Displaying{' '}
            <b>{props.filters.dateRange === 'live' ? 'live logs' : 'date range logs'}</b>{' '}
            for {props.application} Application, {props.environment} Environment,{' '}
            {microservices}
        </Typography>
    );

    const dialog = LogContextDialog(logContextDialog, setLogContextDialog, showTimestamp);

    return (
        <>
            {dialog}
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
                                            label='Timestamp'
                                            control={
                                                <Switch
                                                    checked={showTimestamp}
                                                    onChange={(event) =>
                                                        setShowTimestamp(
                                                            event.target.checked
                                                        )
                                                    }
                                                />
                                            }
                                        />
                                    </FormGroup>
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
                                </Box>
                            </Grid>
                        </Grid>
                        <Divider sx={{ borderColor: 'background.paper', m: 1 }} />
                        <LogLines
                            logs={props.logs}
                            showContextButton
                            showTimestamp={showTimestamp}
                            showMicroservice={showMicroservice}
                            showDateRangeHeaderAndFooter={
                                props.filters.dateRange !== 'live'
                            }
                            onClickShowContextButton={handleOnClickShowLineContext}
                        />
                        <InView
                            onChange={handleInViewChange}
                            // TODO: We can set the rootMargin to trigger earlier than reaching the actual bottom
                            fallbackInView={false}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

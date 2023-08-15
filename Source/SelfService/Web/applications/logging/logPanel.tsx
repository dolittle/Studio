// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';
import { InView } from 'react-intersection-observer';

import { Divider, Grid, Paper, Typography, } from '@mui/material';

import { AlertBox, AlertBoxErrorMessage, NewSwitch } from '@dolittle/design-system';

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
    environment?: string;

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
        //environment: '',
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
                //environment: labels.environment,
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
            <AlertBox title='Something went wrong' message={<AlertBoxErrorMessage />} sx={{ mt: 2 }} />
        );
    }

    if (!props.logs.loading && props.logs.lines.length === 0) {
        return (
            <AlertBox
                severity='info'
                title='No logs found'
                message='Try adjusting the filters, or verify that your microservices are running.'
                sx={{ mt: 2 }}
            />
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

    const environments =
        props.filters.environment === undefined ||
            props.filters.environment?.length === 0
            ? 'all Environments'
            : props.filters.environment?.length === 1
                ? `${props.filters.environment?.[0]} Environment`
                : `${props.filters.environment
                    ?.map((_) => _)
                    .join(', ')} Environments`;

    const title = (
        <Typography variant='body2' color='textSecondary' fontStyle='italic' mt={1}>
            Displaying{' '}
            <b>{props.filters.dateRange === 'live' ? 'live logs' : 'date range logs'}</b>{' '}
            for {props.application} Application,{' '}
            {environments}, and{' '}
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
                            <Grid item xs={12} lg={8}>
                                {title}
                            </Grid>

                            <Grid item xs={12} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <NewSwitch
                                    label='Timestamp'
                                    checked={showTimestamp}
                                    onChange={event => setShowTimestamp(event.target.checked)}
                                />

                                <NewSwitch
                                    label='Microservice'
                                    onChange={event => setShowMicroservice(event.target.checked)}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ borderColor: 'background.paper', m: 1 }} />

                        <LogLines
                            logs={props.logs}
                            showContextButton
                            showTimestamp={showTimestamp}
                            showMicroservice={showMicroservice}
                            showDateRangeHeaderAndFooter={props.filters.dateRange !== 'live'}
                            onClickShowContextButton={handleOnClickShowLineContext}
                        />

                        {/* TODO: We can set the rootMargin to trigger earlier than reaching the actual bottom */}
                        <InView onChange={handleInViewChange} fallbackInView={false} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

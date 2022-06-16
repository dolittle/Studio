// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useCallback, useRef } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import { ButtonText } from '../theme/buttonText';

import { ObservableLogLines } from './loki/logLines';
import { LoadMoreLinesIfAvailable } from './loki/useLogsFromRange';
import { DataLabels } from './loki/types';
import { QueryLabels } from './loki/queries';

import { LogFilterMicroservice, LogFilterObject } from './logFilter/logFilterPanel';
import { ColoredLine } from './lineParsing';
import { LogLines } from './logLines';
import { LogLinesAbsolute } from './logLinesAbsolute';

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
     * The filters to apply to the logs query.
     */
    filters: LogFilterObject;


    logs: ObservableLogLines<ColoredLine>;

    loadMoreLogs?: () => void;
};

type LogContextState = {
    show: boolean;
    application: string,
    applicationId: string,
    environment: string;
    microservice: string,
    microserviceId: string,
    from: bigint,
    to: bigint,
};

/**
 * A component that renders {@link ObservableLogLines} in a log panel.
 */
export const LogPanel = (props: LogPanelProps) => {
    const [showTimestamp, setShowTimestamp] = useState(false);
    const [showMicroservice, setShowMicroservice] = useState(false);

    const [logContext, setLogContext] = useState<LogContextState>({
        show: false,
        application: '',
        applicationId: '',
        environment: '',
        microservice: '',
        microserviceId: '',
        from: 0n,
        to: 0n,
    });

    const handleOnClickShowLineContext = useCallback((timestamp: bigint, labels: DataLabels) => {
        //alert(`Show context for ${JSON.stringify(labels)} around ${timestamp}`);
        console.log('Showing context for', labels);
        setLogContext({
            show: true,
            application: labels.application,
            applicationId: labels.application_id,
            environment: labels.environment,
            microservice: labels.microservice,
            microserviceId: labels.microservice_id,
            from: timestamp - 86_400_000_000_000n,
            to: timestamp,
        });
    }, [setLogContext]);

    const handleInViewChange = useCallback((visible: boolean) => {
        if (visible) props.loadMoreLogs?.();
    }, [props.loadMoreLogs]);

    if (props.logs.failed) {
        return (
            <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Alert severity='error' variant='outlined'>
                        <AlertTitle>Something went wrong</AlertTitle>
                        Please try again later. If the problem persists, please <Link href='mailto:support@dolittle.com'>contact support</Link>.
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
        props.filters.microservice === undefined || props.filters.microservice?.length === 0
            ? 'all Microservices'
            : props.filters.microservice?.length === 1
                ? `${props.filters.microservice?.[0].name} Microservice`
                : `${props.filters.microservice?.map((_) => _.name).join(', ')} Microservices`;

    const title = (
        <Typography variant='body2' color='textSecondary' fontStyle='italic' mt={1}>
            Displaying <b>{props.filters.dateRange === 'live' ? 'live logs' : 'date range logs'}</b> for {props.application} Application, {props.environment} Environment, {microservices}
        </Typography>
    );


    return (
        <>
            <Dialog open={logContext.show} maxWidth='lg' fullWidth scroll='paper'>
                <DialogTitle>Detailed view</DialogTitle>
                <LogLinesAbsolute
                    applicationId={logContext.applicationId}
                    environment={logContext.environment}
                    filters={{ dateRange: { start: logContext.from, stop: logContext.to }, searchTerms: [], microservice: [{ id: logContext.microserviceId, name: logContext.microservice }] }}
                    from={logContext.from}
                    to={logContext.to}
                    initialNumberOfLines={10}
                    autoLoadMoreLogs
                    autoLoadMoreNumberOfLines={10}
                    render={(logs, loadMoreLogs) => (
                        <>
                            <DialogContent>
                                <LogLines
                                    logs={logs}
                                    showTimestamp={showTimestamp}
                                    sx={{
                                        '& > div:first-child': {
                                            color: '#75e8db', // TODO: Where does this color come from?
                                        },
                                    }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <ButtonText
                                    onClick={() => setLogContext(state => ({ ...state, show: false }))}
                                >Close</ButtonText>
                                <ButtonText
                                    onClick={() => loadMoreLogs()}
                                >Show more</ButtonText>
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
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
                                                        setShowTimestamp(event.target.checked)
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

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, MutableRefObject } from 'react';
import { InView } from 'react-intersection-observer';

import { useLogsFromRange, LoadMoreLinesIfAvailable } from './loki/useLogsFromRange';

import { parseLogLine } from './lineParsing';
import { LogFilterObject } from './logFilter/logFilterPanel';
import { LogPanel, logPanelQueryLabels } from './logPanel';

export type LogPanelAbsoluteProps = {
    /**
     * The Application to get logs for.
     */
    application: string;

    /**
     * The ApplicationID to get logs for.
     */
    applicationId: string;

    /**
     * The Environment to get logs for.
     */
    environment: string;

    /**
     * The filters to apply to the logs query.
     */
    filters: LogFilterObject;

    /**
     * The smallest time in Unix epoch nanoseconds to fetch logs from.
     */
    from: bigint;

    /**
     * The largest time in Unix epoch nanoseconds to fetch logs from.
     */
    to: bigint;

    /**
     * Whether or not to display the 'SHOW' context button for each line.
     */
    showContextButtonInLines?: boolean;

    /**
     * The maximum number of lines to fetch in the first request.
     * Defaults to 1000;
     */
    initialNumberOfLines?: number;

    /**
     * Whether or not automatic fetching of new lines when scrolling to the bottom should be enabled.
     */
    autoLoadMoreLogs?: boolean;

    /**
     * The maximum number of lines to fetch in the first request.
     * Defaults to 1000;
     */
    autoLoadMoreNumberOfLines?: number;

    /**
     * An optional ref that will be set to the function to call to load more logs lines if they are available.
     */
    loadMoreLogsRef?: MutableRefObject<LoadMoreLinesIfAvailable>;
};

export const LogPanelAbsolute = (props: LogPanelAbsoluteProps) => {
    const [labels, pipeline] = logPanelQueryLabels(props.applicationId, props.environment, props.filters);

    const newestFirst = true; // TODO: What is required to support ordering the other way? Might impact the hooks and the LogPanel.

    const [logs, loadMoreLogs] = useLogsFromRange(props.from, props.to, newestFirst, labels, pipeline, props.initialNumberOfLines ?? 1000, parseLogLine);

    if (props.loadMoreLogsRef !== undefined) props.loadMoreLogsRef.current = loadMoreLogs;

    const handleInViewChange = useCallback((visible: boolean) => {
        if (props.autoLoadMoreLogs === true && visible) loadMoreLogs(props.autoLoadMoreNumberOfLines ?? 1000);
    }, [props.autoLoadMoreLogs, props.autoLoadMoreNumberOfLines, loadMoreLogs]);

    return <LogPanel
        application={props.application}
        environment={props.environment}
        microservices={props.filters.microservice}
        timespan='date range logs'
        logs={logs}
        enableShowLineContextButton={props.showContextButtonInLines}
        footer={
            <InView
                onChange={handleInViewChange}
                // TODO: We can set the rootMargin to trigger earlier than reaching the actual bottom
                fallbackInView={false}
            />
        }
    />;
};

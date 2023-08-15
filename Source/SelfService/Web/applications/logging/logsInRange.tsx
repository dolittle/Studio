// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useCallback } from 'react';

import { LogFilterObject } from './logFilter/logFilterPanel';
import { logFilterToLabelsAndPipeline } from './logFilter/logFilterToLabelsAndPipeline';
import { useLogsFromRange } from './loki/useLogsFromRange';
import { ObservablePartialLogLines } from './loki/logLines';

import { ColoredLine, parseLogLine } from './lineParsing';

export type LoadMoreLogs = () => void;

export type LogsInRangeProps = {
    /**
     * The ApplicationID to get logs for.
     */
    applicationId: string;

    /**
     * The Environment to get logs for.
     */
    environment?: string;

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
     * The maximum number of lines to fetch in the first request.
     * Defaults to 1000;
     */
    firstFetchLimit?: number;

    /**
     * The maximum number of lines to fetch in the first request.
     * Defaults to 1000;
     */
    moreFetchLimit?: number;

    /**
     * The rendering function that will be called with the fetched logs, and a function to call to fetch additional logs.
     */
    render: (logs: ObservablePartialLogLines<ColoredLine>, loadMoreLogs: LoadMoreLogs) => JSX.Element;
};

export const LogsInRange = (props: LogsInRangeProps) => {
    const [labels, pipeline] = logFilterToLabelsAndPipeline(props.applicationId, props.filters);

    const newestFirst = true; // TODO: What is required to support ordering the other way? Might impact the hooks and the LogPanel.

    const [logs, loadMore] = useLogsFromRange(props.from, props.to, newestFirst, labels, pipeline, props.firstFetchLimit ?? 1000, parseLogLine);

    const loadMoreLogs = useCallback(() =>
        loadMore(props.moreFetchLimit ?? 1000)
        , [props.moreFetchLimit, loadMore]);

    return props.render(logs, loadMoreLogs);
};

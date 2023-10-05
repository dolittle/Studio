// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LogFilterObject } from './logFilter/logFilterPanel';
import { logFilterToLabelsAndPipeline } from './logFilter/logFilterToLabelsAndPipeline';
import { useLogsFromLast } from './loki/useLogsFromLast';
import { ObservableLogLines } from './loki/logLines';

import { ColoredLine, parseLogLine } from './lineParsing';

export type LogsFromLastProps = {
    /**
     * The ApplicationID to get logs for.
     */
    applicationId: string;

    /**
     * The filters to apply to the logs query.
     */
    filters: LogFilterObject;

    /**
     * The time in nanoseconds to fetch logs from.
     * Range: [now-last, now].
     */
    last: bigint;

    /**
     * The maximum number of lines to fetch.
     * Defaults to 1000;
     */
    numberOfLines?: number;

    /**
     * The rendering function that will be called with the fetched logs.
     */
    render: (logs: ObservableLogLines<ColoredLine>) => JSX.Element;
};

export const LogsFromLast = (props: LogsFromLastProps) => {
    const [labels, pipeline] = logFilterToLabelsAndPipeline(props.applicationId, props.filters);

    const newestFirst = true; // TODO: What is required to support ordering the other way? Might impact the hooks and the LogPanel.

    const logs = useLogsFromLast(props.last, newestFirst, labels, pipeline, props.numberOfLines ?? 1000, parseLogLine);

    return props.render(logs);
};

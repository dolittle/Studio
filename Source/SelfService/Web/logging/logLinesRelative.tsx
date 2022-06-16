// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLogsFromLast } from './loki/useLogsFromLast';
import { DataLabels } from './loki/types';


import { LogFilterObject } from './logFilter/logFilterPanel';
import { ColoredLine, parseLogLine } from './lineParsing';
import { LogLines } from './logLines';
import { LogPanel, logPanelQueryLabels } from './logPanel';
import { Observable } from 'rxjs';
import { ObservableLogLines } from './loki/logLines';

export type LogLinesRelativeProps = {
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
     * The time in nanoseconds to fetch logs from.
     * Range: [now-last, now].
     */
    last: bigint;

    /**
     * The maximum number of lines to fetch.
     * Defaults to 1000;
     */
    numberOfLines?: number;

    render: (logs: ObservableLogLines<ColoredLine>) => JSX.Element;
};

export const LogLinesRelative = (props: LogLinesRelativeProps) => {
    const [labels, pipeline] = logPanelQueryLabels(props.applicationId, props.environment, props.filters);

    const newestFirst = true; // TODO: What is required to support ordering the other way? Might impact the hooks and the LogPanel.

    const logs = useLogsFromLast(props.last, newestFirst, labels, pipeline, props.numberOfLines ?? 1000, parseLogLine);

    return props.render(logs);

    // return <LogLines
    //     logs={logs}
    //     showContextButton={props.showContextButton}
    //     showMicroservice={props.showMicroservice}
    //     showTimestamp={props.showTimestamp}
    //     onClickShowContextButton={props.onClickShowContextButton}
    // />;
};

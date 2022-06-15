// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLogsFromLast } from './loki/useLogsFromLast';

import { LogFilterObject } from './logFilter/logFilterPanel';
import { parseLogLine } from './lineParsing';
import { LogPanel, logPanelQueryLabels } from './logPanel';

export type LogPanelRelativeProps = {
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
     * The time in nanoseconds to fetch logs from.
     * Range: [now-last, now].
     */
    last: bigint;

    /**
     * Whether or not to display the 'SHOW' context button for each line.
     */
    showContextButtonInLines?: boolean;

    /**
     * The maximum number of lines to fetch.
     * Defaults to 1000;
     */
    numberOfLines?: number;
};

export const LogPanelRelative = (props: LogPanelRelativeProps) => {
    const [labels, pipeline] = logPanelQueryLabels(props.applicationId, props.environment, props.filters);

    const newestFirst = true; // TODO: What is required to support ordering the other way? Might impact the hooks and the LogPanel.

    const logs = useLogsFromLast(props.last, newestFirst, labels, pipeline, props.numberOfLines ?? 1000, parseLogLine);

    return <LogPanel
        application={props.application}
        environment={props.environment}
        microservices={props.filters.microservice}
        timespan='live logs'
        logs={logs}
        enableShowLineContextButton={props.showContextButtonInLines}
    />;
};

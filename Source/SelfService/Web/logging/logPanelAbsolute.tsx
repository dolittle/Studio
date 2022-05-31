// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLogsFromRange } from './loki/useLogsFromRange';

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
    showContextButtonInLines: boolean;
};

export const LogPanelAbsolute = (props: LogPanelAbsoluteProps) => {
    const [labels, pipeline] = logPanelQueryLabels(props.applicationId, props.environment, props.filters);

    const newestFirst = true; // TODO: Where to move these
    const limit = 1000;

    const [logs, loadMoreLogs] = useLogsFromRange(props.from, props.to, newestFirst, labels, pipeline, limit, parseLogLine);

    return <LogPanel
        application={props.application}
        environment={props.environment}
        microservices={props.filters.microservice}
        logs={logs}
        enableShowLineContextButton={props.showContextButtonInLines}
    />;
};

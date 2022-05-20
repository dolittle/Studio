// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { lokiQueryRange, LogLine } from './loki';

const lokiLabelSelectorsFrom = (labels: LogPanelQueryLabels): string =>
    Object.entries(labels).map(entry => `${entry[0]}="${entry[1]}"`).join(',');

const lokiQueryStringFrom = (query: LogPanelQuery): string =>
    `{ ${lokiLabelSelectorsFrom(query.labels)} }${query.pipeline !== undefined ? query.pipeline.join(' ') : ''}`;

// TODO: Can we ensure that there is at least one property set? I think it is required by Loki
type LogPanelQueryLabels = {
    [key: string]: string
};

export type LogPanelQuery = {
    labels: LogPanelQueryLabels,
    pipeline?: string[],
};

export type LogPanelTime = {
    last: number,
    // autoRefresh?: number,
} | {
    from: number,
    to: number,
};

export type LogPanelProps = {
    time: LogPanelTime,
    query: LogPanelQuery,
    direction?: 'backward' | 'forward'
    limit?: number
};

const getStartEndTimes = (time: LogPanelTime): [number, number] => {
    if ('from' in time) {
        return [time.from, time.to];
    }

    const to = Date.now() * 1e6;
    return [to - time.last, to];
};

export const LogPanel = (props: LogPanelProps) => {
    const [logLines, setLogLines] = useState<LogLine[]>([]);

    const [startEnd, setStartEnd] = useState(getStartEndTimes(props.time));

    useEffect(() => {
        const queryString = lokiQueryStringFrom(props.query);

        lokiQueryRange({
            query: queryString,
            limit: props.limit ?? 1000,
            direction: props.direction ?? 'backward',
            start: startEnd[0],
            end: startEnd[1],
        }).then(setLogLines);
    }, [props.query, props.limit, props.direction, startEnd]);

    return (
        <>
            <pre>
                {logLines.map(_ => _.text).join('\n')}
            </pre>
        </>
    );
};

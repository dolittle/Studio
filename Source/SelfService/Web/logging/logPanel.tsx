// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

// start?: number
// end?: number
// step?: number
// query: LokiQuery

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
    autoRefresh?: number,
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

export const LogPanel = (props: LogPanelProps) => {
    return (
        <>
            <h1>{JSON.stringify(props.query)}</h1>
            <h1>{JSON.stringify(props.time)}</h1>
        </>
    );
};

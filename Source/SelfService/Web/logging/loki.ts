// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// import { FailedToFetchLogsFromLoki } from './failedToFetchLogsFromLoki';

type LokiQueryResponseStatistics = {};

type LokiQueryResponseVector = {
    resultType: 'vector',
    result: {
        metric: { [label: string]: string },
        value: [number, string],
    }[],
    stats: LokiQueryResponseStatistics,
};

type LokiQueryResponseMatrix = {
    resultType: 'matrix',
    result: {
        metric: { [label: string]: string },
        values: [number, string][],
    }[],
    stats: LokiQueryResponseStatistics,
};

type LokiQueryResponseStreams = {
    resultType: 'streams',
    result: {
        stream: { [label: string]: string },
        values: [string, string][],
    }[],
    stats: LokiQueryResponseStatistics,
};

type LokiQueryResponse = {
    status: 'success',
    data: LokiQueryResponseVector | LokiQueryResponseMatrix | LokiQueryResponseStreams,
};

export type LokiQueryRangeRequest = {
    query: string,
    start?: number,
    end?: number,
    step?: number,
    direction: 'backward' | 'forward',
    limit: number,
};

export type LogLine = {
    timestamp: number,
    text: string,
    labels: { [label: string]: string },
};

export const lokiQueryRange = async (request: LokiQueryRangeRequest): Promise<LogLine[]> => {
    // const queryString = Object.entries(request)
    //     .map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`)
    //     .join('&');

    // const response = await fetch(`/api/system/monitoring/logs/v1/query_range?${queryString}`, { method: 'GET', mode: 'cors' });

    // if (!response.ok) {
    //     throw new FailedToFetchLogsFromLoki(response.status, await response.text());
    // }

    // const data = await response.json() as LokiQueryResponse;

    // if (data.status !== 'success') {
    //     throw new FailedToFetchLogsFromLoki(response.status, 'Response status was not success');
    // }

    // if (data.data.resultType !== 'streams') {
    //     throw new FailedToFetchLogsFromLoki(response.status, 'Response result type was not streams');
    // }

    // const lines: LogLine[] = [];
    // for (const stream of data.data.result) {
    //     for (const [timestamp, text] of stream.values) {
    //         lines.push({
    //             timestamp: parseInt(timestamp),
    //             text,
    //             labels: stream.stream,
    //         });
    //     }
    // }

    // if (request.direction === 'forward') {
    //     lines.sort((a, b) => a.timestamp - b.timestamp);
    // } else {
    //     lines.sort((a, b) => b.timestamp - a.timestamp);
    // }

    // return lines;
    return [];
};

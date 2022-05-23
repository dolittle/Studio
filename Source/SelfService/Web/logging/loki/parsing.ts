// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LogLine } from './logLines';
import { QueryRangeResponse } from './types';

/**
 * Parses and merges all streams from a Loki query-range request into a single list of log lines.
 * @param response The Loki query range response to parse and merge lines from.
 * @returns Parsed and merged LogLines from the response.
 */
export const parseAndMergeAllStreams = (response: QueryRangeResponse): LogLine[] => {
    if (response.data.resultType !== 'streams') {
        return [];
    }

    const lines: LogLine[] = [];

    for (const result of response.data.result) {
        for (const line of result.values) {
            lines.push({
                labels: result.stream,
                timestamp: parseInt(line[0]),
                line: line[1],
            });
        }
    }

    return lines;
};

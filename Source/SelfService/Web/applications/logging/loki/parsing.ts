// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { LogLine } from './logLines';
import { DataLabels } from './types';

/**
 * Parses and merges all streams from a Loki response into a single list of log lines.
 * @param streams The streams to merge.
 * @returns Parsed and merged LogLines from the response.
 */
export const parseAndMergeAllStreams = (streams: { stream: DataLabels, values: [string, string][] }[]): LogLine[] => {

    const lines: LogLine[] = [];

    for (const stream of streams) {
        for (const line of stream.values) {
            lines.push({
                labels: stream.stream,
                timestamp: BigInt(line[0]),
                line: line[1],
            });
        }
    }

    return lines;
};

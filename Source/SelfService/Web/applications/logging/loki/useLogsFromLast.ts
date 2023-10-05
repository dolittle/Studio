// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, useState } from 'react';
import { of, from, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, catchError, concatMap, startWith, scan, tap, switchMap } from 'rxjs/operators';

import { LogLine, TransformedLogLine, ObservableLogLines } from './logLines';
import { QueryRangeRequest, TailResponseMessage } from './types';
import { labelsAndPipelineToLogQL, QueryLabels, queryRange } from './queries';
import { tail } from './streaming';
import { parseAndMergeAllStreams } from './parsing';

type Parameters = {
    query: string;
    last: bigint;
    newestFirst: boolean;
    limit: number;
};

const tailAfterLastReceivedLine = <T>(query: QueryRangeRequest, lines: TransformedLogLine<T>[]): Observable<TailResponseMessage> => {
    const lastReceivedTime = lines.reduce((previous, current) => previous > current.timestamp ? previous : current.timestamp, query.start!);
    return tail({ query: query.query, start: lastReceivedTime + 1n, limit: query.limit });
};

// TODO: Does it even make sense to allow querying forward when useLogsFromLast?
// With the streaming implementation now, it will attempt to retrieve any skipped logs using the tail request.
// We might want to hardcode the Loki request to be backward (fetch the newest logs) - fix the limit - and just report that there are more logs we didn't retrieve.
// Then the UX should point you to useLogsFromRange to get the ones you missed (maybe with a graph showing log count as bars).

/**
 * Returns log lines fetched from Loki from the specified timespan up until now, and streams new incoming log lines.
 * The log lines are re-fetched whenever the arguments change.
 * @param last The timespan to fetch log lines within, in nanoseconds.
 * @param newestFirst True to return the newest log lines first in the returned list, false to return the oldest log lines first. This also affects which log lines are returned if there are more than the specified limit within the timespan.
 * @param labels The stream labels to fetch logs for.
 * @param pipeline The filtering pipeline to apply to the logs.
 * @param limit The maximum amount of logs to retrieve. Together with newestFirst, this will truncate to the newest or last logs in the specified timespan.
 * @param transform The transform to apply to add extra data to each logline before returning.
 * @returns An observable object of loglines with transformed extra data.
 */
export const useLogsFromLast = <T>(last: bigint, newestFirst: boolean, labels: QueryLabels, pipeline: string[], limit: number, transform: (line: LogLine) => T): ObservableLogLines<T> => {
    const [result, setResult] = useState<ObservableLogLines<T>>({ loading: false, failed: false, lines: [] });
    const subject = useRef<Subject<Parameters>>();

    useEffect(() => {
        const s = subject.current = new Subject();

        const queries = s.pipe(
            distinctUntilChanged((p, c) => p.limit === c.limit && p.newestFirst === c.newestFirst && p.last === c.last && p.query === c.query),
            map((p): QueryRangeRequest => {
                const { query, last, newestFirst, limit } = p;

                const end = BigInt(Date.now()) * 1_000_000n;
                const start = end - last;
                const direction = newestFirst ? 'backward' : 'forward';

                return { query, start, end, direction, limit };
            })
        );

        const fetches = queries.pipe(
            switchMap(query => from(queryRange(query)).pipe(
                map((response): LogLine[] => {
                    if (response.data.resultType === 'streams') {
                        return parseAndMergeAllStreams(response.data.result);
                    }
                    return [];
                }),
                map(lines => lines.map(line => ({ ...line, data: transform(line) }))),

                // TODO: Enable toggling of this tail stuff
                concatMap((lines) => tailAfterLastReceivedLine(query, lines).pipe(
                    map(message => parseAndMergeAllStreams(message.streams)),
                    map(lines => lines.map(line => ({ ...line, data: transform(line) }))),
                    scan((lastLines, newLines) => {
                        return lastLines.concat(newLines);
                    }, lines),
                    startWith(lines),
                )),

                tap(lines => lines.sort((a, b) => {
                    if (query.direction === 'forward') {
                        if (a.timestamp > b.timestamp) {
                            return 1;
                        } else if (a.timestamp < b.timestamp) {
                            return -1;
                        }
                        return 0;
                    } else {
                        if (a.timestamp < b.timestamp) {
                            return 1;
                        } else if (a.timestamp > b.timestamp) {
                            return -1;
                        }
                        return 0;
                    }
                })),
                map((lines): ObservableLogLines<T> => ({ loading: false, failed: false, lines })),
                startWith<ObservableLogLines<T>>({ loading: true, failed: false, lines: [] }),
            )),
            catchError(error => of({ loading: false, failed: true, error, lines: [] })),
        );

        const subscription = fetches.subscribe(setResult);
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (subject.current === undefined) return;

        subject.current.next({ query: labelsAndPipelineToLogQL(labels, pipeline), last, newestFirst, limit });

    }, [subject.current, last, newestFirst, labels, pipeline, limit]);

    return result;
};

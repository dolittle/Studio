// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, useState } from 'react';
import { from, Subject } from 'rxjs';
import { distinctUntilChanged, map, concatMap, startWith, scan, tap } from 'rxjs/operators';

import { LogLine, ObservableLogLines } from './logLines';
import { DataLabels, QueryRangeRequest } from './types';
import { labelsAndPipelineToLogQL, queryRange } from './queries';
import { parseAndMergeAllStreams } from './parsing';

type Parameters = {
    query: string;
    last: number;
    newestFirst: boolean;
    limit: number;
};

/**
 * Returns log lines fetched from Loki from the specified timespan up until now.
 * The log lines are re-fetched whenever the arguments change.
 * @param last The timespan to fetch log lines within, in nanoseconds.
 * @param newestFirst True to return the newest log lines first in the returned list, false to return the oldest log lines first. This also affects which log lines are returned if there are more than the specified limit within the timespan.
 * @param labels The stream labels to fetch logs for.
 * @param pipeline The filtering pipeline to apply to the logs.
 * @param limit The maximum amount of logs to retrieve. Together with newestFirst, this will truncate to the newest or last logs in the specified timespan.
 * @param transform The transform to apply to add extra data to each logline before returning.
 * @returns An observable object of loglines with transformed extra data.
 */
export const useLogsFromLast = <T>(last: number, newestFirst: boolean, labels: DataLabels, pipeline: string[], limit: number, transform: (line: LogLine) => T): ObservableLogLines<T> => {
    const [result, setResult] = useState<ObservableLogLines<T>>({ loading: false, lines: [] });
    const subject = useRef<Subject<Parameters>>();

    useEffect(() => {
        const s = subject.current = new Subject();

        const queries = s.pipe(
            distinctUntilChanged((p, c) => p.limit === c.limit && p.newestFirst === c.newestFirst && p.last === c.last && p.query === c.query),
            map((p): QueryRangeRequest => {
                const { query, last, newestFirst, limit } = p;

                const end = Date.now() * 1e6;
                const start = end - last;
                const direction = newestFirst ? 'backward' : 'forward';

                return { query, start, end, direction, limit };
            })
        );

        const fetches = queries.pipe(
            concatMap(query => from(queryRange(query)).pipe(
                map(parseAndMergeAllStreams),
                map(lines => lines.map(line => ({ ...line, data: transform(line) }))),
                tap(lines => lines.sort((a, b) => {
                    if (query.direction === 'forward') {
                        return a.timestamp - b.timestamp;
                    }
                    return b.timestamp - a.timestamp;
                })),
                map((lines): ObservableLogLines<T> => ({ loading: false, lines })),
                startWith<ObservableLogLines<T>>({ loading: true, lines: [] }),
            ))
        );

        const results = fetches.pipe(
            scan((last, next) => ({
                loading: next.loading,
                lines: next.loading ? last.lines : next.lines,
            }), { loading: false, lines: [] } as ObservableLogLines<T>),
        );

        const subscription = results.subscribe(setResult);
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (subject.current === undefined) return;

        subject.current.next({ query: labelsAndPipelineToLogQL(labels, pipeline), last, newestFirst, limit });

    }, [subject.current, last, newestFirst, labels, pipeline, limit]);

    return result;
};

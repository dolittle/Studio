// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, useState } from 'react';
import { from as rxFrom, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, concatMap, startWith, scan, tap, switchMap } from 'rxjs/operators';

import { LogLine, TransformedLogLine, ObservablePartialLogLines } from './logLines';
import { DataLabels, QueryRangeRequest } from './types';
import { labelsAndPipelineToLogQL, queryRange } from './queries';
import { parseAndMergeAllStreams } from './parsing';

type Parameters = {
    query: string;
    from: number;
    to: number;
    newestFirst: boolean;
    limit: number;
};

export type LoadMoreLinesIfAvailable = (limit: number) => void;

/**
 * Returnes log lines fetched from Loki from the specified time range.
 * The log lines are re-fetched whenever the arguments change.
 * @param from The beginning of the time range to fetch log lines from, in Unix epoch nanoseconds.
 * @param to The end of the time range to fetch log lines from, in Unix epoch nanoseconds.
 * @param newestFirst True to return the newest log lines first in the returned list, false to return the oldest log lines first. This also affects which log lines are returned if there are more than the specified limit within the timespan.
 * @param labels The stream labels to fetch logs for.
 * @param pipeline The filtering pipeline to apply to the logs.
 * @param limit The maximum amount of logs to retrieve. Together with newestFirst, this will truncate to the newest or last logs in the specified timespan.
 * @param transform The transform to apply to add extra data to each logline before returning.
 * @returns An observable object of loglines with transformed extra data, and a function to call to load more lines if available.
 */
export const useLogsFromRange = <T>(from: number, to: number, newestFirst: boolean, labels: DataLabels, pipeline: string[], limit: number, transform: (line: LogLine) => T): [ObservablePartialLogLines<T>, LoadMoreLinesIfAvailable] => {
    const [result, setResult] = useState<ObservablePartialLogLines<T>>({ loading: false, failed: false, lines: [], moreLinesAvailable: false });
    const subject = useRef<Subject<Parameters>>();
    const loadMoreSubject = useRef<Subject<number>>();

    // useEffect(() => {
    //     const s = subject.current = new Subject();
    //     const loadMore = loadMoreSubject.current = new Subject();

    //     const incomingQueries = s.pipe(
    //         distinctUntilChanged((p, c) => p.limit === c.limit && p.newestFirst === c.newestFirst && p.from === c.from && p.to === c.to && p.query === c.query),
    //     );

    //     const queries = incomingQueries.pipe(
    //         map((p): QueryRangeRequest => {
    //             const { query, from, to, newestFirst, limit } = p;

    //             const direction = newestFirst ? 'backward' : 'forward';

    //             return { query, start: from, end: to, direction, limit };
    //         })
    //     );

    //     const fetches = queries.pipe(
    //         switchMap(query => rxFrom(queryRange(query)).pipe(
    //             map((response): LogLine[] => {
    //                 if (response.data.resultType === 'streams') {
    //                     return parseAndMergeAllStreams(response.data.result);
    //                 }
    //                 return [];
    //             }),
    //             map(lines => lines.map(line => ({ ...line, data: transform(line) }))),
    //             tap(lines => lines.sort((a, b) => {
    //                 if (query.direction === 'forward') {
    //                     return a.timestamp - b.timestamp;
    //                 }
    //                 return b.timestamp - a.timestamp;
    //             })),

    //             map((lines): ObservablePartialLogLines<T> => ({ loading: false, lines, moreLinesAvailable: false })),
    //             startWith<ObservablePartialLogLines<T>>({ loading: true, lines: [], moreLinesAvailable: false }),
    //         )),
    //         tap(value => {
    //             console.log('NEXT', value);
    //         })
    //     );

    //     loadMore.subscribe({
    //         next: (limit) => console.log('Load', limit, 'more logs'),
    //     });

    //     const subscription = fetches.subscribe(setResult);
    //     return () => subscription.unsubscribe();
    // }, []);

    // useEffect(() => {
    //     if (subject.current === undefined) return;

    //     subject.current.next({ query: labelsAndPipelineToLogQL(labels, pipeline), from, to, newestFirst, limit });

    // }, [subject.current, from, to, newestFirst, labels, pipeline, limit]);

    return [
        result,
        (limit) => loadMoreSubject.current?.next(limit),
    ];
};

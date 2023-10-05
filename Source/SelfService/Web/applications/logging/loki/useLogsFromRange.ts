// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useRef, useState } from 'react';
import { of, from as rxFrom, Observable, Subject, EMPTY } from 'rxjs';
import { distinctUntilChanged, map, concatMap, startWith, tap, take, switchMap, expand, catchError } from 'rxjs/operators';

import { LogLine, TransformedLogLine, ObservablePartialLogLines } from './logLines';
import { labelsAndPipelineToLogQL, queryRange, QueryLabels } from './queries';
import { parseAndMergeAllStreams } from './parsing';

type Parameters = {
    query: string;
    from: bigint;
    to: bigint;
    newestFirst: boolean;
    limit: number;
};

type State<T> = {
    initialFetch: boolean;
    parameters: Parameters;
    loading: boolean;
    lines: TransformedLogLine<T>[];
    moreLinesAvailable: boolean;
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
export const useLogsFromRange = <T>(from: bigint, to: bigint, newestFirst: boolean, labels: QueryLabels, pipeline: string[], limit: number, transform: (line: LogLine) => T): [ObservablePartialLogLines<T>, LoadMoreLinesIfAvailable] => {
    const [result, setResult] = useState<ObservablePartialLogLines<T>>({ loading: false, failed: false, lines: [], moreLinesAvailable: false });
    const subject = useRef<Subject<Parameters>>();
    const loadMoreSubject = useRef<Subject<number>>();

    useEffect(() => {
        const s = subject.current = new Subject();
        const loadMore = loadMoreSubject.current = new Subject();

        const queries = s.pipe(
            distinctUntilChanged((p, c) => p.limit === c.limit && p.newestFirst === c.newestFirst && p.from === c.from && p.to === c.to && p.query === c.query),
        );

        const fetches = queries.pipe(
            switchMap(parameters => {
                const initialState: State<T> = { initialFetch: true, loading: false, parameters, lines: [], moreLinesAvailable: false };

                return of(initialState).pipe(
                    expand(state => {
                        if (state.loading || (!state.initialFetch && !state.moreLinesAvailable)) {
                            return EMPTY;
                        }

                        const next: Observable<State<T>> = state.initialFetch
                            ? of(state)
                            : loadMore.pipe(take(1), map(limit => {
                                const parameters = { ...state.parameters, limit };
                                return { ...state, parameters };
                            }));

                        return next.pipe(
                            concatMap(state => rxFrom(queryRange({
                                query: state.parameters.query,
                                start: state.parameters.from,
                                end: state.parameters.to,
                                direction: state.parameters.newestFirst ? 'backward' : 'forward',
                                limit: state.parameters.limit,
                            }))
                                .pipe(
                                    map((response): LogLine[] => {
                                        if (response.data.resultType === 'streams') {
                                            return parseAndMergeAllStreams(response.data.result);
                                        }
                                        return [];
                                    }),
                                    map(lines => lines.map(line => ({ ...line, data: transform(line) }))),
                                    tap(lines => lines.sort((a, b) => {
                                        if (!state.parameters.newestFirst) {
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
                                    map((lines): State<T> => {
                                        const parameters = { ...state.parameters };
                                        let fetchedLines = state.lines;

                                        if (lines.length > 0) {
                                            const endOfLinesTimestamp = lines[lines.length - 1].timestamp;

                                            if (state.parameters.newestFirst) {
                                                parameters.to = endOfLinesTimestamp - 1n;
                                                fetchedLines = state.lines.concat(lines);
                                            } else {
                                                parameters.from = endOfLinesTimestamp + 1n;
                                                fetchedLines = lines.concat(state.lines);
                                            }
                                        }

                                        const moreLinesAvailable =
                                            state.parameters.limit === lines.length &&
                                            parameters.from < parameters.to;

                                        return { initialFetch: false, loading: false, parameters, lines: fetchedLines, moreLinesAvailable };
                                    }),
                                    startWith<State<T>>({ initialFetch: false, loading: true, parameters: state.parameters, lines: state.lines, moreLinesAvailable: false }),
                                )),
                        );
                    }),
                    map(({ loading, lines, moreLinesAvailable }): ObservablePartialLogLines<T> => ({ loading, failed: false, lines, moreLinesAvailable })),
                );
            }),
            catchError(error => of({ loading: false, failed: true, error, lines: [], moreLinesAvailable: false })),
        );

        const subscription = fetches.subscribe(setResult);
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (subject.current === undefined) return;

        subject.current.next({ query: labelsAndPipelineToLogQL(labels, pipeline), from, to, newestFirst, limit });

    }, [subject.current, from, to, newestFirst, labels, pipeline, limit]);

    return [
        result,
        (limit) => loadMoreSubject.current?.next(limit),
    ];
};

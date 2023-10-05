// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataLabels } from './types';

/**
 * Defines a log-line retrieved from Loki.
 */
export type LogLine = {
    /**
     * The labels of the stream of lines this line comes from.
     */
    labels: DataLabels;

    /**
     * The nanosecond Unix epoch timestamp of when the log line was scraped.
     */
    timestamp: bigint;

    /**
     * The log line as text.
     */
    line: string;
};

/**
 * Defines a log-line retrieved from Loki with a transform applied to generate some extra data.
 */
export type TransformedLogLine<T> = LogLine & {
    /**
     * The extra data from the transform.
     */
    data: T;
};

/**
 * Defines the result of an observable query that returns log lines from Loki with some transform.
 */
export type ObservableLogLines<T> = {
    /**
     * An indicator set to true if the query is currently loading results.
     */
    loading: boolean;

    /**
     * An indicator wheter or not the request failed.
     */
    failed: boolean;

    /**
     * The request failure - if indicated.
     */
    error?: unknown;

    /**
     * The observable transformed log lines.
     */
    lines: TransformedLogLine<T>[];
};

/**
 * Defines the result of an observable query that returns log lines from Loki with some transform, and an indication whether or not there are more lines available to query.
 */
export type ObservablePartialLogLines<T> = ObservableLogLines<T> & {
    /**
     * An indicator set to true if there (probably) are more lines avaliable to query.
     */
    moreLinesAvailable: boolean;
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

type CommonRequestProperties = {
    /**
     * The LogQL query to perform.
     */
    query: string;

    /**
     * The max number of entries to return. It defaults to 100. Only applies to query types which produce a stream(log lines) response.
     */
    limit?: number;
};

type CommonQueryRequestProperties = CommonRequestProperties & {

    /**
     *  Determines the sort order of logs. Supported values are forward or backward. Defaults to backward.
     */
    direction?: 'forward' | 'backward';
};

type CommonQueryResponseProperties = {
    /**
     * The status of the query.
     */
    status: 'success';
};

type QueryResponseStatistics = {};

/**
 * Defines a set of labels for a metric or log stream.
 */
export type DataLabels = {
    [label: string]: string;
};

type VectorData = {
    /**
     * The data result type.
     */
    resultType: 'vector';

    /**
     * The result of the query.
     */
    result: {
        /**
         * The metric labels.
         */
        metric: DataLabels;

        /**
         * The current metric [timestamp, value].
         */
        value: [number, string];
    }[];

    /**
     * The statistics of the query execution.
     */
    stats: QueryResponseStatistics;
};

type MatrixData = {
    /**
     * The data result type.
     */
    resultType: 'matrix';

    /**
     * The result of the query.
     */
    result: {
        /**
         * The metric labels.
         */
        metric: DataLabels;

        /**
         * The pairs of metric [timestamp, value].
         */
        values: [number, string][];
    }[];

    /**
     * The statistics of the query execution.
     */
    stats: QueryResponseStatistics;
};

type StreamsData = {
    /**
     * The data result type.
     */
    resultType: 'streams';

    /**
     * The result of the query.
     */
    result: {
        /**
         * The stream labels.
         */
        stream: DataLabels;

        /**
         * The pairs of stream [timestamp, log line].
         */
        values: [string, string][];
    }[];

    /**
     * The statistics of the query execution.
     */
    stats: QueryResponseStatistics;
};

/**
 * Defines the properties of a '/loki/api/v1/query' request.
 */
export type QueryRequest = CommonQueryRequestProperties & {
    /**
     * The evaluation time for the query as a nanosecond Unix epoch. Defaults to now.
     */
    time?: bigint;
};

/**
 * Defines the properties of a '/loki/api/v1/query' response.
 */
export type QueryResponse = CommonQueryResponseProperties & {
    /**
     * The result of the query.
     */
    data: VectorData | StreamsData;
};

/**
 * Defines the properties of a '/loki/api/v1/query_range' request.
 */
export type QueryRangeRequest = CommonQueryRequestProperties & {
    /**
     * The start time for the query as a nanosecond Unix epoch. Defaults to one hour ago.
     */
    start?: bigint;

    /**
     * The end time for the query as a nanosecond Unix epoch. Defaults to now.
     */
    end?: bigint;

    /**
     * Query resolution step width in duration format or float number of seconds.
     * duration refers to Prometheus duration strings of the form [0-9]+[smhdwy].
     * For example, 5m refers to a duration of 5 minutes.
     * Defaults to a dynamic value based on start and end.
     * Only applies to query types which produce a matrix response.
     */
    step?: string;
};


/**
 * Defines the properties of a '/loki/api/v1/query_range' response.
 */
export type QueryRangeResponse = CommonQueryResponseProperties & {
    /**
     * The result of the query.
     */
    data: MatrixData | StreamsData;
};

/**
 * Defines the properties of a '/loki/api/v1/tail' request.
 */
export type TailRequest = CommonRequestProperties & {
    /**
     * The start time for the query as a nanosecond Unix epoch. Defaults to one hour ago.
     */
    start?: bigint;

    /**
     *  The number of seconds to delay retrieving logs to let slow loggers catch up. Defaults to 0 and cannot be larger than 5.
     */
    delay_for?: number;
};


/**
 * Defines the properties of a '/loki/api/v1/tail' response message.
 */
export type TailResponseMessage = {
    /**
     * The newly arrived stream entries.
     */
    streams: {
        /**
         * The stream labels.
         */
        stream: DataLabels;

        /**
         * The pairs of stream [timestamp, log line].
         */
        values: [string, string][];
    }[];

    /**
     * Dropped stream entries.
     */
    dropped_entries?: {
        /**
         * The stream labels.
         */
        labels: DataLabels;

        /**
         * The dropped entry timestamp.
         */
        timestamp: string;
    }[];
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

type CommonQueryRequestProperties = {
    /**
     * The Metrics query to perform.
     */
    query: string;
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
    data: MatrixData;
};

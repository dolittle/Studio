// Copyright (c) Aigonix. All rights reserved.
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

/**
 * Defines a set of labels for a metric.
 */
export type DataLabels = {
    [label: string]: string;
};

/**
 * Defines the result data type of an instant query.
 */
export type VectorData = {
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
};

/**
 * Defines the result data type of a range query.
 */
export type MatrixData = {
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
};

/**
 * Defines the properties of a '/prometheus/api/v1/query' request.
 */
export type QueryInstantRequest = CommonQueryRequestProperties & {
    /**
     * The time for the query as a Unix epoch in seconds. Defaults to now.
     */
    time?: number;
};


/**
 * Defines the properties of a '/prometheus/api/v1/query' response.
 */
export type QueryInstantResponse = CommonQueryResponseProperties & {
    /**
     * The result of the query.
     */
    data: VectorData;
};


/**
 * Defines the properties of a '/prometheus/api/v1/query_range' request.
 */
export type QueryRangeRequest = CommonQueryRequestProperties & {
    /**
     * The start time for the query as a Unix epoch in seconds.
     */
    start: number;

    /**
     * The end time for the query as a Unix epoch in seconds.
     */
    end: number;

    /**
     * Query resolution step width in seconds.
     */
    step: number;
};


/**
 * Defines the properties of a '/prometheus/api/v1/query_range' response.
 */
export type QueryRangeResponse = CommonQueryResponseProperties & {
    /**
     * The result of the query.
     */
    data: MatrixData;
};

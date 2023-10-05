// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataLabels, QueryRequest, QueryResponse, QueryRangeRequest, QueryRangeResponse } from './types';
import { FailedToFetchFromLoki } from './failedToFetchFromLoki';

/**
 * Represents a set of labels to query for.
 */
export type QueryLabels = {
    [label: string]: string | string[] | undefined;
};

/**
 * Generates a LogQL query from a label selector an filtering pipeline.
 * @param labels The metric or stream labels to select.
 * @param pipeline The filtering pipeline to apply.
 * @returns The LogQL query string.
 */
export const labelsAndPipelineToLogQL = (labels: QueryLabels, pipeline: string[]): string => {
    const selector = Object.entries(labels)
        .filter(entry => entry[1] !== undefined)
        .map(entry => Array.isArray(entry[1])
            ? entry[1].length > 1
                ? `${entry[0]}=~"${entry[1].join('|')}"`
                : `${entry[0]}="${entry[1][0]}"`
            : `${entry[0]}="${entry[1]}"`)
        .join(',');
    return `{${selector}}${pipeline.join(' ')}`;
};

/**
 * Builds a querystring for the provided Loki query request.
 * @param request The query request to build the querystring for.
 * @returns A querystring.
 */
export const buildRequestQuerystring = (request: QueryRequest | QueryRangeRequest): string =>
    Object.entries(request)
        .filter(entry => entry[1] !== undefined)
        .map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1].toString())}`)
        .join('&');

const fetchFromLokiEnsuringJson = async (path: string, request: QueryRequest | QueryRangeRequest): Promise<any> => {
    const response = await fetch(`${path}?${buildRequestQuerystring(request)}`, { method: 'GET', mode: 'cors' });

    if (!response.ok) {
        throw new FailedToFetchFromLoki(response.status, await response.text());
    }

    const data = await response.json();

    if (data?.status !== 'success') {
        throw new FailedToFetchFromLoki(response.status, 'Response status was not success');
    }

    return data;
};

/**
 * Makes a '/loki/api/v1/query' request to Loki, and decodes the response.
 * @param request The request to make.
 * @returns A {@link Promise} that, when resolved, returns the {@link QueryResponse}.
 */
export const query = async (request: QueryRequest): Promise<QueryResponse> => {
    const data = await fetchFromLokiEnsuringJson('/api/system/monitoring/logs/v1/query', request);

    if (data?.data?.resultType !== 'vector' && data?.data?.resultType !== 'streams') {
        throw new FailedToFetchFromLoki(200, 'Result type was not vector or streams');
    }

    return data as QueryResponse;
};

/**
 * Makes a '/loki/api/v1/query_range' request to Loki, and decodes the response.
 * @param request The request to make.
 * @returns A {@link Promise} that, when resolved, returns the {@link QueryRangeResponse}.
 */
export const queryRange = async (request: QueryRangeRequest): Promise<QueryRangeResponse> => {
    const data = await fetchFromLokiEnsuringJson('/api/system/monitoring/logs/v1/query_range', request);

    if (data?.data?.resultType !== 'matrix' && data?.data?.resultType !== 'streams') {
        throw new FailedToFetchFromLoki(200, 'Result type was not matrix or streams');
    }

    return data as QueryRangeResponse;
};

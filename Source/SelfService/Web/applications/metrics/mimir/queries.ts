// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FailedToFetchFromMimir } from './failedToFetchFromMimir';
import { QueryInstantRequest, QueryInstantResponse, QueryRangeRequest, QueryRangeResponse } from './types';

/**
 * Represents a set of labels to query for.
 */
export type QueryLabels = {
    [label: string]: string | string[] | undefined;
};

/**
 * Generates a PromQL query from a label selector an filtering pipeline.
 * @param labels The metric or stream labels to select.
 * @param pipeline The filtering pipeline to apply.
 * @returns The PromQL query string.
 */
export const labelsAndPipelineToPromQL = (labels: QueryLabels, pipeline: string[]): string => {
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
 * Builds a querystring for the provided Prometheus query request.
 * @param request The query request to build the querystring for.
 * @returns A querystring.
 */
export const buildRequestQuerystring = (request: QueryInstantRequest | QueryRangeRequest): string =>
    Object.entries(request)
        .filter(entry => entry[1] !== undefined)
        .map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1].toString())}`)
        .join('&');

const fetchMetricsEnsuringJson = async (path: string, request: QueryInstantRequest | QueryRangeRequest): Promise<any> => {
    const response = await fetch(`${path}?${buildRequestQuerystring(request)}`, { method: 'GET', mode: 'cors' });

    if (!response.ok) {
        throw new FailedToFetchFromMimir(response.status, await response.text());
    }

    const data = await response.json();

    if (data?.status !== 'success') {
        throw new FailedToFetchFromMimir(response.status, 'Response status was not success');
    }

    return data;
};

/**
 * Makes a '/prometheus/api/v1/query' request to Prometheus, and decodes the response.
 * @param request The request to make.
 * @returns A {@link Promise} that, when resolved, returns the {@link QueryInstantResponse}.
 */
export const queryInstant = async (request: QueryInstantRequest): Promise<QueryInstantResponse> => {
    const data = await fetchMetricsEnsuringJson('/api/system/monitoring/metrics/v1/query', request);

    if (data?.data?.resultType !== 'vector') {
        throw new FailedToFetchFromMimir(200, 'Result type was not vector');
    }

    return data as QueryInstantResponse;
};

/**
 * Makes a '/prometheus/api/v1/query_range' request to Prometheus, and decodes the response.
 * @param request The request to make.
 * @returns A {@link Promise} that, when resolved, returns the {@link QueryRangeResponse}.
 */
export const queryRange = async (request: QueryRangeRequest): Promise<QueryRangeResponse> => {
    const data = await fetchMetricsEnsuringJson('/api/system/monitoring/metrics/v1/query_range', request);

    if (data?.data?.resultType !== 'matrix') {
        throw new FailedToFetchFromMimir(200, 'Result type was not matrix');
    }

    return data as QueryRangeResponse;
};

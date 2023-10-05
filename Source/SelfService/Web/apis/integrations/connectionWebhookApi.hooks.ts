// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    ConnectionsIdWebhooksDisablePostRequest,
    ConnectionsIdWebhooksEnablePostRequest,
    ConnectionsIdWebhooksStatusGetRequest,
    ConnectionWebhookApi,
    WebhookStatusDto,
} from './generated';

let apiInstance: ConnectionWebhookApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ConnectionWebhookApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdWebhookStatusGet = (params: ConnectionsIdWebhooksStatusGetRequest, options?: UseQueryOptions<WebhookStatusDto, unknown, WebhookStatusDto, string[]>) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionWebhookStatus_GET, params.id],
        queryFn: api.connectionsIdWebhooksStatusGet.bind(api, params),
        ...options
    });
};

export const useConnectionsIdWebhooksEnablePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdWebhooksEnablePostRequest) => api.connectionsIdWebhooksEnablePost(params),
    });
};

export const useConnectionsIdWebhooksDisablePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdWebhooksDisablePostRequest) => api.connectionsIdWebhooksDisablePost(params),
    });
};

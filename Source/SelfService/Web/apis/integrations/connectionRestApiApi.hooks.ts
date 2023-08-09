// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    ConnectionRestApiApi,
    ConnectionsIdRestApiStatusGetRequest,
    ConnectionsIdRestApiEnablePostRequest,
    ConnectionsIdRestApiDisablePostRequest,
} from './generated';

let apiInstance: ConnectionRestApiApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ConnectionRestApiApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdRestApiStatusGet = (params: ConnectionsIdRestApiStatusGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionRestApiStatus_GET, params.id],
        queryFn: api.connectionsIdRestApiStatusGet.bind(api, params)
    });
};

export const useConnectionsIdRestApiEnablePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdRestApiEnablePostRequest) => api.connectionsIdRestApiEnablePost(params),
    });
};

export const useConnectionsIdRestApiDisablePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdRestApiDisablePostRequest) => api.connectionsIdRestApiDisablePost(params),
    });
};

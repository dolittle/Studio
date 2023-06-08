// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    ConnectionsApi,
    ConnectionsIdDeleteRequest,
    ConnectionsIdPostRequest,
    ConnectionsIdGetRequest,
    ConnectionsIdNamePostRequest,
    ConnectionsIdConnectorDeploymentGetRequest,
} from './generated';

let apiInstance: ConnectionsApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ConnectionsApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsGet = () => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.Connections_GET],
        queryFn: api.connectionsGet.bind(api)
    });
};

export const useConnectionsIdGet = (params: ConnectionsIdGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.Connection_GET, params.id],
        queryFn: api.connectionsIdGet.bind(api, params),
    });
};

export const useConnectionsIdPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdPostRequest) => api.connectionsIdPost(params),
    });
};

export const useConnectionsIdDelete = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdDeleteRequest) => api.connectionsIdDelete(params),
    });
};

export const useConnectionsIdNamePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdNamePostRequest) => api.connectionsIdNamePost(params),
    });
};

export const useConnectionsIdConnectorDeploymentGet = (params: ConnectionsIdConnectorDeploymentGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.Connection_GET, params.id, CACHE_KEYS.ConnectionsConnectorDeployment_GET],
        queryFn: api.connectionsIdConnectorDeploymentGet.bind(api, params),
        staleTime: 60000,
    });
};

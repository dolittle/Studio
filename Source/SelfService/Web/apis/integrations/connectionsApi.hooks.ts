// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsApi, ConnectionsIdPostRequest } from './generated';

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

export const useConnectionsIdPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdPostRequest) => api.connectionsIdPost(params),
    });
};


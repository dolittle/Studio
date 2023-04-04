// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    MessageMappingApi,
    ConnectionsIdMessageMappingsGetRequest,
    ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest
} from './generated';

let apiInstance: MessageMappingApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new MessageMappingApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdMessageMappingsGet = (params: ConnectionsIdMessageMappingsGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionMessageMapping_GET, params.id],
        queryFn: api.connectionsIdMessageMappingsGet.bind(api, params),
        staleTime: 60000,
    });
};

export const useConnectionsIdMessageMappingsTablesTableMessagesMessagePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest) =>
            api.connectionsIdMessageMappingsTablesTableMessagesMessagePost(params),
    });
};

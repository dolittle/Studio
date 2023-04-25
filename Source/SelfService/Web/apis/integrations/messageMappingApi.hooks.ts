// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    MessageMappingApi,
    ConnectionsIdMessageMappingsGetRequest,
    ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest,
    ConnectionsIdMessageMappingsTablesTableMessagesMessageGetRequest,
    ConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPostRequest,
    ConnectionsIdMessageMappingsDeployPostRequest,
    ConnectionsIdMessageMappingsDeleteMultiplePostRequest
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
        queryKey: [CACHE_KEYS.ConnectionMessageMappings_GET, params.id],
        queryFn: api.connectionsIdMessageMappingsGet.bind(api, params),
        staleTime: 60000,
    });
};

export const useConnectionsIdMessageMappingsTablesTableMessagesMessageGet = (params: ConnectionsIdMessageMappingsTablesTableMessagesMessageGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionMessageMapping_GET, params.id, params.table, params.message],
        queryFn: api.connectionsIdMessageMappingsTablesTableMessagesMessageGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.table && !!params.message,
    });
};

export const useConnectionsIdMessageMappingsTablesTableMessagesMessagePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdMessageMappingsTablesTableMessagesMessagePostRequest) =>
            api.connectionsIdMessageMappingsTablesTableMessagesMessagePost(params),
    });
};

export const useConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPost =
    (options?: UseMutationOptions<void, unknown, ConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPostRequest, unknown>) => {
        const api = getOrCreateApi();
        return useMutation({
            ...{
                mutationFn: (params: ConnectionsIdMessageMappingsTablesTableMessagesMessageDeployPostRequest) =>
                    api.connectionsIdMessageMappingsTablesTableMessagesMessageDeployPost(params),
            }, ...options
        });
    };

    export const useConnectionsIdMessageMappingsDeployPost =
    (options?: UseMutationOptions<string[], unknown, ConnectionsIdMessageMappingsDeployPostRequest, unknown>) => {
        const api = getOrCreateApi();
        return useMutation({
            ...{
                mutationFn: (params: ConnectionsIdMessageMappingsDeployPostRequest) =>
                    api.connectionsIdMessageMappingsDeployPost(params),
            }, ...options
        });
    };

    /**
     * Hook to Delete multiple message mappings.
     * @param options Options for the mutation
     * @returns UseMutationResult for the query
     */
    export const useConnectionsIdMessageMappingsDeleteMultiplePost =
    (options?: UseMutationOptions<string[], unknown, ConnectionsIdMessageMappingsDeleteMultiplePostRequest, unknown>) => {
        const api = getOrCreateApi();
        return useMutation({
            ...{
                mutationFn: (params: ConnectionsIdMessageMappingsDeleteMultiplePostRequest) =>
                    api.connectionsIdMessageMappingsDeleteMultiplePost(params),
            }, ...options
        });
    };

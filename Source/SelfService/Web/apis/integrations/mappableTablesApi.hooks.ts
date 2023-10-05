// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsIdMessageMappingsTablesSearchGetRequest, MappableTablesApi, ConnectionsIdMessageMappingsTablesTableGetRequest } from './generated';

let apiInstance: MappableTablesApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new MappableTablesApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdMessageMappingsTablesSearchGet = (params: ConnectionsIdMessageMappingsTablesSearchGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [
            CACHE_KEYS.ConnectionMappableTables_GET,
            CACHE_KEYS.ConnectionMappableTablesSearch_GET,
            params.id,
            params.search,
            params.pageSize,
            params.startIndex,
        ],
        queryFn: api.connectionsIdMessageMappingsTablesSearchGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.search,
    });
};

export const useConnectionsIdMessageMappingsTablesTableGet = (params: ConnectionsIdMessageMappingsTablesTableGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [
            CACHE_KEYS.ConnectionMappableTables_GET,
            CACHE_KEYS.ConnectionMappableTablesTable_GET,
            params.id,
            params.table,
        ],
        queryFn: api.connectionsIdMessageMappingsTablesTableGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.table,
    });
};

// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGetRequest, TableMetadataAssistantApi } from './generated';

let apiInstance: TableMetadataAssistantApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new TableMetadataAssistantApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet = (params: ConnectionsIdMetadataTableAssistantTableNameColumnRecommendationsGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [
            //CACHE_KEYS.ConnectionMappableTables_GET,
            CACHE_KEYS.ConnectionTableMetadataAssistant_GET,
            params.id,
            params.tableName,
            params.userWantsAndNeeds,
        ],
        queryFn: api.connectionsIdMetadataTableAssistantTableNameColumnRecommendationsGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.tableName && !!params.userWantsAndNeeds,
    });
};

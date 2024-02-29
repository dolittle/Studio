// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsIdCommandsGetRequest, ConnectionsIdCommandsCommandIdCreatePostRequest, CommandMappingApi } from './generated';

let apiInstance: CommandMappingApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new CommandMappingApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdCommandsGet = (params: ConnectionsIdCommandsGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionCommandMappings_GET, params.id],
        queryFn: api.connectionsIdCommandsGet.bind(api, params),
        staleTime: 60000,
    });
};

export const useConnectionsIdCommandsCommandIdCreatePostRequest = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdCommandsCommandIdCreatePostRequest) =>
            api.connectionsIdCommandsCommandIdCreatePost(params),
    });
};

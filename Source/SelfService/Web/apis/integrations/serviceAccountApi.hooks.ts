// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    ServiceAccountApi,
    ConnectionsIdServiceAccountsGetRequest,
    ConnectionsIdServiceAccountsServiceAccountNamePostRequest,
    ConnectionsIdServiceAccountsServiceAccountNameDeleteRequest,
} from './generated';

let apiInstance: ServiceAccountApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ServiceAccountApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdServiceAccountsGet = (params: ConnectionsIdServiceAccountsGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionServiceAccounts_GET, params.id],
        queryFn: api.connectionsIdServiceAccountsGet.bind(api, params)
    });
};


export const useConnectionsIdServiceAccountsServiceAccountNamePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdServiceAccountsServiceAccountNamePostRequest) => api.connectionsIdServiceAccountsServiceAccountNamePost(params),
    });
};

export const useConnectionsIdServiceAccountsServiceAccountNameDelete = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdServiceAccountsServiceAccountNameDeleteRequest) => api.connectionsIdServiceAccountsServiceAccountNameDelete(params),
    });
};

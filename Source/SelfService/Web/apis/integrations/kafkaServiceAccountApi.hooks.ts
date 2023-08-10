// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation, QueryOptions, UseQueryOptions } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    KafkaServiceAccountApi,
    ConnectionsIdKafkaServiceAccountsGetRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNameGetRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNamePostRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNameDeleteRequest,
    KafkaServiceAccountListDto,
} from './generated';

let apiInstance: KafkaServiceAccountApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new KafkaServiceAccountApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdKafkaServiceAccountsGet = (
    params: ConnectionsIdKafkaServiceAccountsGetRequest,
    options?: UseQueryOptions<KafkaServiceAccountListDto[], unknown, KafkaServiceAccountListDto[], string[]>
    ) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, params.id],
        queryFn: api.connectionsIdKafkaServiceAccountsGet.bind(api, params),
        ...options
    });
};

export const useConnectionsIdKafkaServiceAccountsServiceAccountNameGet = (params: ConnectionsIdKafkaServiceAccountsServiceAccountNameGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, params.id, CACHE_KEYS.ConnectionKafkaServiceAccountsName_GET, params.serviceAccountName],
        queryFn: api.connectionsIdKafkaServiceAccountsServiceAccountNameGet.bind(api, params),
        enabled: params.serviceAccountName !== undefined && params.serviceAccountName !== '',
        staleTime: 1000 * 60 * 2,
    });
};


export const useConnectionsIdKafkaServiceAccountsServiceAccountNamePost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdKafkaServiceAccountsServiceAccountNamePostRequest) => api.connectionsIdKafkaServiceAccountsServiceAccountNamePost(params),
    });
};

export const useConnectionsIdKafkaServiceAccountsServiceAccountNameDelete = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdKafkaServiceAccountsServiceAccountNameDeleteRequest) => api.connectionsIdKafkaServiceAccountsServiceAccountNameDelete(params),
    });
};

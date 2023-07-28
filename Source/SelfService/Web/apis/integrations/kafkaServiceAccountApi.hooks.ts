// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery, useMutation } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import {
    KafkaServiceAccountApi,
    ConnectionsIdKafkaServiceAccountsGetRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNameGetRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNamePostRequest,
    ConnectionsIdKafkaServiceAccountsServiceAccountNameDeleteRequest,
} from './generated';

let apiInstance: KafkaServiceAccountApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new KafkaServiceAccountApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdKafkaServiceAccountsGet = (params: ConnectionsIdKafkaServiceAccountsGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionKafkaServiceAccounts_GET, params.id],
        queryFn: api.connectionsIdKafkaServiceAccountsGet.bind(api, params)
    });
};

export const useConnectionsIdKafkaServiceAccountsServiceAccountNameGet = (params: ConnectionsIdKafkaServiceAccountsServiceAccountNameGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [CACHE_KEYS.ConnectionKafkaServiceAccountsName_GET, params.id],
        queryFn: api.connectionsIdKafkaServiceAccountsServiceAccountNameGet.bind(api, params)
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

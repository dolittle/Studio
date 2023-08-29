// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionConfigurationApi, ConnectionsIdConfigurationBasicPostRequest, ConnectionsIdConfigurationIonPostRequest, ConnectionsIdConfigurationMdpPostRequest } from './generated';

let apiInstance: ConnectionConfigurationApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ConnectionConfigurationApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdConfigurationMdpPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdConfigurationMdpPostRequest) => api.connectionsIdConfigurationMdpPost(params),
    });
};

export const useConnectionsIdConfigurationIonPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdConfigurationIonPostRequest) => api.connectionsIdConfigurationIonPost(params),
    });
};

export const useConnectionsIdConfigurationBasicPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdConfigurationBasicPostRequest) => api.connectionsIdConfigurationBasicPost(params),
    });
};

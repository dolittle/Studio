// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { useQuery, useMutation } from '@tanstack/react-query';
import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsIdDeployCloudPostRequest, ConnectionsIdDeployOnPremisesPostRequest, DeploymentApi } from './generated';

let apiInstance: DeploymentApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new DeploymentApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdDeployOnPremisesPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdDeployOnPremisesPostRequest) => api.connectionsIdDeployOnPremisesPost(params),
    });
};

export const useConnectionsIdDeployCloudPost = () => {
    const api = getOrCreateApi();
    return useMutation({
        mutationFn: (params: ConnectionsIdDeployCloudPostRequest) => api.connectionsIdDeployCloudPost(params),
    });
};


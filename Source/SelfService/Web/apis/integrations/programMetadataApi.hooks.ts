// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useQuery } from '@tanstack/react-query';

import { API_CONFIGURATION } from './api';
import { CACHE_KEYS } from './CacheKeys';
import { ConnectionsIdMetadataProgramsSearchGetRequest, ConnectionsIdMetadataProgramsProgramProgramGetRequest, ProgramMetadataApi } from './generated';

let apiInstance: ProgramMetadataApi | undefined;

const getOrCreateApi = () => {
    if (!apiInstance) {
        apiInstance = new ProgramMetadataApi(API_CONFIGURATION);
    }
    return apiInstance;
};

export const useConnectionsIdMetadataProgramsSearchGet = (params: ConnectionsIdMetadataProgramsSearchGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [
            CACHE_KEYS.ConnectionProgramMetadata_GET,
            CACHE_KEYS.ConnectionProgramMetadataSearch_GET,
            params.id,
            params.query,
        ],
        queryFn: api.connectionsIdMetadataProgramsSearchGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.query,
    });
};

export const useConnectionsIdMetadataProgramsProgramProgramGet = (params: ConnectionsIdMetadataProgramsProgramProgramGetRequest) => {
    const api = getOrCreateApi();
    return useQuery({
        queryKey: [
            CACHE_KEYS.ConnectionProgramMetadata_GET,
            CACHE_KEYS.ConnectionProgramMetadataProgram_GET,
            params.id,
            params.program,
        ],
        queryFn: api.connectionsIdMetadataProgramsProgramProgramGet.bind(api, params),
        staleTime: 60000,
        enabled: !!params.id && !!params.program,
    });
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { useQuery } from '@tanstack/react-query';
import { CACHE_KEYS } from './CacheKeys';
import { connectionsGet } from './connections';

export const useConnectionsGet = () => {
    return useQuery([CACHE_KEYS.Connections_GET], connectionsGet);
};


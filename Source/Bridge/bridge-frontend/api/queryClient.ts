// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const buildQueryClient = () =>{
    const clientOptions: QueryClientConfig = {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 , // 1 minute
            }
        }

    };
    return new QueryClient(clientOptions);
};

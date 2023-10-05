// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { QueryClient } from '@tanstack/react-query';

export const buildQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, //retrying by default is a convenient feature, but can become noisy. Experimenting with it turned off. This can be overridden for a specific query
            }
        }
    });
};

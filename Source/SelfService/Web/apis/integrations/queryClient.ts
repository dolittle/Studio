// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { QueryClient } from '@tanstack/react-query';

export const buildQueryClient = () =>{
    return new QueryClient();
};

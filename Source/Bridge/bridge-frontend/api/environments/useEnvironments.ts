// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { BaseAPIFactory } from './../apiInitializer';
import { EnvironmentApi } from '../generated/apis/EnvironmentApi';
import { useQuery } from '@tanstack/react-query';

async function getEnvironments() {
    const api = BaseAPIFactory(EnvironmentApi);
    return api.metadataEnvironmentsGet();
}

export const useEnvironments = () => {
    return useQuery(['getEnvironments'], getEnvironments);
};


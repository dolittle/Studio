import { BaseAPIFactory } from './../apiInitializer';
import { EnvironmentApi } from '../generated/apis/EnvironmentApi';
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react';

async function getEnvironments() {
    const api = BaseAPIFactory(EnvironmentApi);
    return api.metadataEnvironmentsGet();
}

export const useEnvironments = ()  => {
    return useQuery(['getEnvironments'], getEnvironments);
}


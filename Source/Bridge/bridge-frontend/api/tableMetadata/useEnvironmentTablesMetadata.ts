import { MetadataEnvironmentsEnvironmentTablesGetRequest, TableMetadataApi } from '../generated/apis/TableMetadataApi';
import { BaseAPIFactory } from '../apiInitializer';
import { useQuery } from '@tanstack/react-query'


async function getEnvironmentTablesMetadata(request: MetadataEnvironmentsEnvironmentTablesGetRequest) {
    const api = BaseAPIFactory(TableMetadataApi);
    return api.metadataEnvironmentsEnvironmentTablesGet(request);
}

export const useEnvironmentTablesMetadata = (requestVariables: MetadataEnvironmentsEnvironmentTablesGetRequest) => {
    return useQuery(['getEnvironments', { requestVariables }], () => getEnvironmentTablesMetadata(requestVariables));
}


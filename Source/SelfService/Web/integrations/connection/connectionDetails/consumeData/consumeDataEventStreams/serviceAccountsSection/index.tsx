// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { AlertBox, ContentWithSubtitle } from '@dolittle/design-system';

import { useConnectionsIdKafkaServiceAccountsGet } from '../../../../../../apis/integrations/kafkaServiceAccountApi.hooks';

import { NoServiceAccounts } from './NoServiceAccounts';
import { ServiceAccountsDataGrid } from './serviceAccountsDataGrid';

export type ServiceAccountsSectionProps = {
    connectionId: string;
};

export const ServiceAccountsSection = ({ connectionId }: ServiceAccountsSectionProps) => {
    const { data, isLoading, isError, error } = useConnectionsIdKafkaServiceAccountsGet({ id: connectionId }, {
        refetchInterval(data) {
            const hasEntriesWithoutCertificateData = data?.some(item => item.certificateExpiry === null || item.certificateExpiry === undefined);
            return hasEntriesWithoutCertificateData ? 2000 : false;
        },
    });

    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    const serviceAccountsDataGridRows = useMemo(() => data?.sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [], [data]);

    return (
        <ContentWithSubtitle title='Service Accounts' infoTooltipLabel='Manage service accounts to be used in apps connecting to the Async API.'>
            {serviceAccountsDataGridRows.length > 0
                ? <ServiceAccountsDataGrid connectionId={connectionId} isLoading={isLoading} serviceAccountsDataGridRows={serviceAccountsDataGridRows} />
                : <NoServiceAccounts connectionId={connectionId} />
            }
        </ContentWithSubtitle>
    );
};

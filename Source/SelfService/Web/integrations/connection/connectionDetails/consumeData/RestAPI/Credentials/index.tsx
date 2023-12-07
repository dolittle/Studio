// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { AlertBox, ContentWithSubtitle } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsGet } from '../../../../../../apis/integrations/serviceAccountApi.hooks';

import { CredentialsDataGrid } from './credentialsDataGrid';

export type CredentialsIndexProps = {
    connectionId: string;
};

export const CredentialsIndex = ({ connectionId }: CredentialsIndexProps) => {
    const { data, isLoading, error, isError } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName?.toLowerCase() !== activeCredential?.toLowerCase() || '')
            .sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [],
        [data, activeCredential]
    );

    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    const infoText = 'Generate new credentials to be used as credentials in apps connecting to the Rest API service.';

    return (
        <ContentWithSubtitle title='Credentials' infoTooltipLabel={infoText}>
            <CredentialsDataGrid
                credentials={credentials}
                connectionId={connectionId}
                isLoading={isLoading}
                onActiveCredentialChange={setActiveCredential}
            />
        </ContentWithSubtitle>
    );
};

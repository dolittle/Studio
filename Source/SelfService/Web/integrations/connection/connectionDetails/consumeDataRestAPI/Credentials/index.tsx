// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { AlertBox, ContentWithSubtitle } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsGet } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CredentialsDataGridIndex } from './credentialsDataGrid';

export const CredentialsIndex = () => {
    const connectionId = useConnectionIdFromRoute();
    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName?.toLowerCase() !== activeCredential?.toLowerCase() || '')
            .sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [],
        [data, activeCredential]
    );

    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    return (
        <ContentWithSubtitle
            title='Credentials'
            infoTooltipLabel='Generate new credentials to be used as credentials in apps connecting to the Rest API service.'
            sx={{ mb: 3 }}
        >
            <CredentialsDataGridIndex credentials={credentials} connectionId={connectionId} isLoading={isLoading} onActiveCredentialChange={setActiveCredential} />
        </ContentWithSubtitle>
    );
};

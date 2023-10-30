// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { Box } from '@mui/material';

import { AlertBox } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsGet } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { CredentialsHeader } from './CredentialsHeader';
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
        <Box sx={{ mb: 3 }}>
            <CredentialsHeader />
            <CredentialsDataGridIndex credentials={credentials} connectionId={connectionId} isLoading={isLoading} onActiveCredentialChange={setActiveCredential} />
        </Box>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import { Collapse, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { AlertBox, Button, ContentSection } from '@dolittle/design-system';
import { useConnectionsIdServiceAccountsGet } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionId } from '../../../../../integrations/routes.hooks';
import { CredentialsList } from './CredentialsList';
import { GenerateCredentialsForm } from './GenerateCredentialsForm';

export type CredentialsSectionProps = {};

export const CredentialsSection = (props: CredentialsSectionProps) => {
    const [openCredentials, setOpenCredentials] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionId()!;
    if (!connectionId) {
        return <AlertBox />;
    }

    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    if (isError) {
        return <AlertBox message={`Error while fetching credentials list. ${error}`} />;
    }



    return (
        <ContentSection
            title='Credentials'
            headerProps={{ buttons: [{ label: 'Generate New Credentials', variant: 'outlined', onClick: () => setOpenCredentials(true) }] }}
        >
            <Collapse in={openCredentials}>
                <GenerateCredentialsForm onFormComplete={() => setOpenCredentials(false)} />
            </Collapse>
                <CredentialsList credentials={data || []} />
        </ContentSection>
    );
};

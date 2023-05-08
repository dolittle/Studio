// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useState } from 'react';
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
    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);
    const [allowGenerateNewCredentials, setAllowGenerateNewCredentials] = useState(true);
    const [resetForm, setResetForm] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const connectionId = useConnectionId();
    if (!connectionId) {
        return <AlertBox />;
    }

    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    const credentials = useMemo(() => data?.filter(credential => credential.serviceAccountName !== activeCredential) || [], [data]);

    const handleTokenGenerated = (tokenName: string) => {
        setActiveCredential(tokenName);
        setAllowGenerateNewCredentials(true);
    };

    const handleGenerateNewCredentials = () => {
        setAllowGenerateNewCredentials(false);
        setOpenCredentials(true);
        setResetForm(true);
    };

    useEffect(() => {
        //TODO: Pav - no like this
        if (resetForm) {
            setResetForm(false);
        }
    }, [resetForm]);


    if (isError) {
        return <AlertBox message={`Error while fetching credentials list. ${error}`} />;
    }


    return (
        <ContentSection
            title='Credentials'
            headerProps={{
                buttons: [
                    {
                        label: 'Generate New Credentials',
                        variant: 'outlined',
                        onClick: handleGenerateNewCredentials,
                        disabled: !allowGenerateNewCredentials
                    }
                ]
            }}
        >
            <Collapse in={openCredentials}>
                <GenerateCredentialsForm resetForm={resetForm} connectionId={connectionId} onFormComplete={handleTokenGenerated} />
            </Collapse>
            <CredentialsList credentials={credentials} />
        </ContentSection>
    );
};

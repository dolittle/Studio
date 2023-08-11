// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useState } from 'react';
import { Collapse } from '@mui/material';

import { AlertBox, ContentParagraph, ContentSection } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsGet, } from '../../../../../apis/integrations/serviceAccountApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { GenerateCredentialsForm } from './GenerateCredentialsForm';
import { CredentialsTableSection } from './CredentialsTableSection';

export type CredentialsSectionProps = {};

export const CredentialsSection = (props: CredentialsSectionProps) => {
    const connectionId = useConnectionIdFromRoute();

    const [expandCredentials, setExpandCredentials] = useState(false);
    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);
    const [resetForm, setResetForm] = useState(false);

    const { data, isLoading, isError, error } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName?.toLowerCase() !== activeCredential?.toLowerCase() || '')
            .sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [],
        [data, activeCredential]
    );

    const allowGenerateNewCredentials = !expandCredentials || (expandCredentials && !!activeCredential);

    const handleTokenGenerated = (tokenName: string) => {
        setActiveCredential(tokenName);
    };

    const handleGenerateNewCredentials = () => {
        setActiveCredential(undefined);
        setResetForm(true);
        setExpandCredentials(true);
    };

    const handleFormCancelled = () => {
        if (credentials.length) {
            setExpandCredentials(false);
        }
        setResetForm(true);
    };

    useEffect(() => {
        if (expandCredentials && !isLoading) {
            setExpandCredentials(true);
        } else {
            const shouldExpand = !isLoading && (credentials.length === 0 || activeCredential !== undefined);
            setExpandCredentials(shouldExpand);
        }

    }, [credentials, activeCredential, expandCredentials, isLoading]);

    useEffect(() => {
        //TODO: Pav - no like this
        if (resetForm) {
            setResetForm(false);
        }
    }, [resetForm]);


    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    return (
        <ContentSection
            title='Credentials'
            headerProps={{
                titleTextVariant: 'title',
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
            <ContentParagraph>
                Manage access tokens to be used as credentials in apps connecting to the Rest API service
            </ContentParagraph>
            <Collapse in={expandCredentials}>
                <ContentSection hideDivider={!expandCredentials} title='Generate New Credentials'>
                    <GenerateCredentialsForm
                        resetForm={resetForm}
                        connectionId={connectionId}
                        onFormComplete={handleTokenGenerated}
                        onFormCancelled={handleFormCancelled}
                        canCancel={credentials.length > 0}
                    />
                </ContentSection>
            </Collapse>
            <CredentialsTableSection credentials={credentials} isLoading={isLoading} connectionId={connectionId} />
        </ContentSection>
    );
};

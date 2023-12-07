// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { AlertBox, ContentWithSubtitle } from '@dolittle/design-system';

import { useConnectionsIdServiceAccountsGet } from '../../../../../../apis/integrations/serviceAccountApi.hooks';

import { NoCredentials } from './NoCredentials';
import { CredentialsDataGrid } from './credentialsDataGrid';

import { GenerateCredentialsDialogIndex } from './generateCredentialsDialog';

export type CredentialsSectionProps = {
    connectionId: string;
};

export const CredentialsSection = ({ connectionId }: CredentialsSectionProps) => {
    const { data, isLoading, error, isError } = useConnectionsIdServiceAccountsGet({ id: connectionId });

    const [isGenerateCredentialsDialogOpen, setIsGenerateCredentialsDialogOpen] = useState(false);
    const [activeCredential, setActiveCredential] = useState<string | undefined>(undefined);

    const handleGenerateNewCredentials = () => {
        setActiveCredential(undefined);
        setIsGenerateCredentialsDialogOpen(true);
    };

    const handleGenerateCredentialsCancel = () => {
        setActiveCredential(undefined);
        setIsGenerateCredentialsDialogOpen(false);
    };

    const handleTokenGenerated = (tokenName: string) => {
        setActiveCredential(tokenName);
    };

    const credentials = useMemo(
        () => data?.filter(credential => credential.serviceAccountName?.toLowerCase() !== activeCredential?.toLowerCase() || '')
            .sort((a, b) => b.createdAt! > a.createdAt! ? 1 : -1) || [],
        [data, activeCredential]
    );

    if (isError) return <AlertBox message={`Error while fetching credentials list. ${error}`} />;

    const infoText = 'Generate new credentials to be used as credentials in apps connecting to the Rest API service.';

    return (
        <>
            <GenerateCredentialsDialogIndex
                connectionId={connectionId}
                isDialogOpen={isGenerateCredentialsDialogOpen}
                onDialogCancel={handleGenerateCredentialsCancel}
                onFormComplete={handleTokenGenerated}
            />

            <ContentWithSubtitle title='Credentials' infoTooltipLabel={infoText}>
                {credentials.length
                    ? (
                        <CredentialsDataGrid
                            credentials={credentials}
                            connectionId={connectionId}
                            isLoading={isLoading}
                            onCredentialCreate={handleGenerateNewCredentials}
                        />
                    ) : <NoCredentials onCredentialCreate={handleGenerateNewCredentials} />
                }
            </ContentWithSubtitle>
        </>
    );
};

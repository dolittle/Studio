// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { NoContentSection } from '@dolittle/design-system';

import { GenerateServiceAccountDialog } from './generateServiceAccountDialog';

export type NoServiceAccountsProps = {
    connectionId: string;
};

export const NoServiceAccounts = ({ connectionId }: NoServiceAccountsProps) => {
    const [isGenerateServiceAccountDialogOpen, setIsGenerateServiceAccountDialogOpen] = useState(false);

    return (
        <>
            <GenerateServiceAccountDialog
                connectionId={connectionId}
                isDialogOpen={isGenerateServiceAccountDialogOpen}
                onDialogClose={() => setIsGenerateServiceAccountDialogOpen(false)}
            />

            <NoContentSection
                title='No Service Accounts yet...'
                description={`To generate New Service Account, select 'Generate New Service Account'. Provide a name, description and set its access rights.`}
                label='Generate New Service Account'
                icon='RocketLaunch'
                onCreate={() => setIsGenerateServiceAccountDialogOpen(true)}
            />
        </>
    );
};

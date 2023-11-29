// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Button, DataGridCustomToolbar } from '@dolittle/design-system';

import { GenerateServiceAccountDialog } from '../GenerateServiceAccountsDialog';
import { DeleteServiceAccountDialog } from '../DeleteServiceAccountDialog';

export type ServiceAccountsDataGridToolbarProps = {
    connectionId: string;
    selectedRowIds: string[];
};

export const ServiceAccountsDataGridToolbar = ({ connectionId, selectedRowIds }: ServiceAccountsDataGridToolbarProps) => {
    const [isGenerateServiceAccountDialogOpen, setIsGenerateServiceAccountDialogOpen] = useState(false);
    const [isDeleteServiceAccountDialogOpen, setIsDeleteServiceAccountDialogOpen] = useState(false);

    return (
        <>
            <GenerateServiceAccountDialog
                connectionId={connectionId}
                isDialogOpen={isGenerateServiceAccountDialogOpen}
                onDialogClose={() => setIsGenerateServiceAccountDialogOpen(false)}
            />

            <DeleteServiceAccountDialog
                connectionId={connectionId}
                selectedRowIds={selectedRowIds}
                isDialogOpen={isDeleteServiceAccountDialogOpen}
                onDialogClose={() => setIsDeleteServiceAccountDialogOpen(false)}
            />

            <DataGridCustomToolbar title='Your Service Accounts'>
                <Button
                    label='Generate New Service Account'
                    startWithIcon='AddCircle'
                    onClick={() => setIsGenerateServiceAccountDialogOpen(true)}
                />

                <Button
                    label='Delete Service Accounts'
                    startWithIcon='DeleteRounded'
                    color='error'
                    disabled={!selectedRowIds.length}
                    onClick={() => setIsDeleteServiceAccountDialogOpen(true)}
                />
            </DataGridCustomToolbar>
        </>
    );
};

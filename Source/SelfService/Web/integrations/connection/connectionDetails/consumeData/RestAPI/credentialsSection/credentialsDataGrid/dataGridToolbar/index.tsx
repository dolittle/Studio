// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Button, DataGridCustomToolbar } from '@dolittle/design-system';

import { useConnectionIdFromRoute } from '../../../../../../../routes.hooks';

import { DeleteCredentialsDialog } from './DeleteCredentialsDialog';

export type CredentialsDataGridToolbarProps = {
    selectedIds: string[];
    onGenerate: () => void;
};

export const CredentialsDataGridToolbar = ({ selectedIds, onGenerate }: CredentialsDataGridToolbarProps) => {
    const connectionId = useConnectionIdFromRoute();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <>
            <DeleteCredentialsDialog
                connectionId={connectionId}
                isDialogOpen={isDeleteDialogOpen}
                onDialogCancel={() => setIsDeleteDialogOpen(false)}
                credentialsToDelete={selectedIds}
            />

            <DataGridCustomToolbar title='Your credentials'>
                <Button
                    label='Generate new credentials'
                    startWithIcon='AddCircle'
                    onClick={onGenerate}
                />

                <Button
                    label='Delete credentials'
                    color='error'
                    startWithIcon='DeleteRounded'
                    disabled={!selectedIds.length}
                    onClick={() => setIsDeleteDialogOpen(true)}
                />
            </DataGridCustomToolbar>
        </>
    );
};

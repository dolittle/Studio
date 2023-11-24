// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, DataGridCustomToolbar } from '@dolittle/design-system';

export type CredentialsDataGridToolbarProps = {
    onGenerate: () => void;
    onDelete: () => void;
    isGenerateButtonDisabled: boolean;
    isDeleteButtonDisabled: boolean;
};

export const CredentialsDataGridToolbar = ({ onGenerate, onDelete, isGenerateButtonDisabled, isDeleteButtonDisabled }: CredentialsDataGridToolbarProps) =>
    <DataGridCustomToolbar title='Your credentials'>
        <Button label='Generate new credentials' startWithIcon='AddCircle' disabled={isGenerateButtonDisabled} onClick={onGenerate} />
        <Button label='Delete credentials' color='error' startWithIcon='DeleteRounded' disabled={isDeleteButtonDisabled} onClick={onDelete} />
    </DataGridCustomToolbar>;

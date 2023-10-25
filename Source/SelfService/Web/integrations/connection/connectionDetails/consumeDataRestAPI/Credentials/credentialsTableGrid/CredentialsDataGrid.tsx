// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro } from '@mui/x-data-grid-pro';

import { DataGridWrapper, dataGridDefaultProps } from '@dolittle/design-system';

import { ServiceAccountListDto } from '../../../../../../apis/integrations/generated';

import { CredentialsDataGridColumns } from './CredentialsDataGridColumns';

export type CredentialsDataGridProps = {
    items: ServiceAccountListDto[];
    isLoading: boolean;
    onSelectionChanged: (selection: string[]) => void;
};

export const CredentialsDataGrid = ({ items, isLoading, onSelectionChanged }: CredentialsDataGridProps) =>
    <DataGridWrapper background='dark'>
        <DataGridPro
            {...dataGridDefaultProps}
            rows={items}
            columns={CredentialsDataGridColumns}
            loading={isLoading}
            checkboxSelection
            getRowId={row => row.serviceAccountName!}
            onSelectionModelChange={model => onSelectionChanged(model as string[])}
        />
    </DataGridWrapper>;

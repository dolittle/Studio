// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { ServiceAccountListDto } from '../../../../../../apis/integrations/generated';

import { CredentialsDataGridColumns } from './CredentialsDataGridColumns';

export type CredentialsDataGridProps = {
    items: ServiceAccountListDto[];
    isLoading: boolean;
    onSelectionChanged: (selection: string[]) => void;
};

export const CredentialsDataGrid = ({ items, isLoading, onSelectionChanged }: CredentialsDataGridProps) =>
    <Paper sx={{ width: 1 }}>
        <DataGridPro
            rows={items}
            columns={CredentialsDataGridColumns}
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            disableColumnReorder
            disableColumnResize
            disableColumnSelector
            disableMultipleSelection
            checkboxSelection
            getRowHeight={() => 'auto'}
            headerHeight={46}
            hideFooter
            loading={isLoading}
            getRowId={row => row.serviceAccountName!}
            onSelectionModelChange={model => onSelectionChanged(model as string[])}
        />
    </Paper>;

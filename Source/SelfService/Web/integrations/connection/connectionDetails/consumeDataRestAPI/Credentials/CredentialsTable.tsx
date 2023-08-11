// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { ServiceAccountListDto } from '../../../../../apis/integrations/generated';
import { formatDate } from '../../../../../utils/helpers/dates';


export type CredentialsTableProps = {
    items: ServiceAccountListDto[];
    isLoading: boolean;
    onSelectionChanged: (selection: string[]) => void;
};

export const CredentialsTable = ({ items, isLoading, onSelectionChanged }: CredentialsTableProps) => {

    const columns: GridColDef<ServiceAccountListDto>[] = [
        {
            field: 'serviceAccountName',
            headerName: 'Name',
            minWidth: 120,
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 250,
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'Created at',
            minWidth: 100,
            flex: 1,
            valueFormatter: (params) => params.value ? formatDate(params.value) : '-',
            renderCell: (params) => {
                return <span title={params.value?.toISOString()}>{params.formattedValue}</span>;
            },
        },
    ];

    return (
        <Paper sx={{ width: 1 }}>
            <DataGridPro
                rows={items}
                columns={columns}
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
                getRowId={(row) => row.serviceAccountName!}
                onSelectionModelChange={(model) => onSelectionChanged(model as string[])}
            />
        </Paper>
    );
};

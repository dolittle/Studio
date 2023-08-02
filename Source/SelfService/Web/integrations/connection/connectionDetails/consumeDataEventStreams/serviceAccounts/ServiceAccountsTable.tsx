// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';
import { Button } from '@dolittle/design-system';

import { KafkaServiceAccountListDto } from '../../../../../apis/integrations/generated';
import { formatDate } from '../../../../../utils/helpers/dates';


export type ServiceAccountsTableProps = {
    items: KafkaServiceAccountListDto[];
    isLoading: boolean;
    onViewCertificate: (serviceAccount: KafkaServiceAccountListDto) => void;
};

export const ServiceAccountsTable = ({ items, isLoading, onViewCertificate }: ServiceAccountsTableProps) => {

    const columns: GridColDef<KafkaServiceAccountListDto>[] = [
        {
            field: 'serviceAccountName',
            headerName: 'Name',
            minWidth: 270,
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 270,
            flex: 1,
        },
        {
            field: 'certificates',
            headerName: 'Certificates',
            minWidth: 350,
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return <><Button variant='outlined' label='View Certificate' onClick={() => onViewCertificate(params.row)} /></>;
            }
        },
        {
            field: 'createdAt',
            headerName: 'Created at',
            minWidth: 270,
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
                getRowHeight={() => 'auto'}
                headerHeight={46}
                hideFooter
                loading={isLoading}
                getRowId={(row) => row.serviceAccountName!}
            />
        </Paper>
    );
};

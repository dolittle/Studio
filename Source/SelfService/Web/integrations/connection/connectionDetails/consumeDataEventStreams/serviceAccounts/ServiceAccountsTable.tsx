// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Paper } from '@mui/material';

import { ServiceAccountListDto } from '../../../../../apis/integrations/generated';


export type ServiceAccountsTableProps = {
    items: ServiceAccountListDto[];
    isLoading: boolean;
};

export const ServiceAccountsTable = ({ items, isLoading }: ServiceAccountsTableProps) => {

    const columns: GridColDef<ServiceAccountListDto>[] = [
        {
            field: 'name',
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
            />
        </Paper>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { TableListingEntry } from '../../../../../../apis/integrations/generated';

const columns: GridColDef<TableListingEntry>[] = [
    {
        field: 'name',
        headerName: 'Table Name',
        minWidth: 200,
    },
    {
        field: 'description',
        headerName: 'Description',
        sortable: false,
        minWidth: 352,
    },
];

type DataGridTableListingEntry = TableListingEntry & {
    id: string;
};

export type TableSearchResultsProps = {
    tableListings: TableListingEntry[];
    isLoading: boolean;
    onTableSelected: (table: TableListingEntry) => void;
};

export const TableSearchResults = ({ tableListings, isLoading, onTableSelected }: TableSearchResultsProps) => {
    const dataGridListing: DataGridTableListingEntry[] = tableListings.map(tableListing => {
        return {
            id: tableListing.name || '',
            ...tableListing,
        };
    });

    const handleRowClick = (tableListing: TableListingEntry) => {
        onTableSelected(tableListing);
    };

    return (
        <Paper sx={{ width: 1, boxShadow: 'none' }}>
            <DataGridPro
                rows={dataGridListing}
                columns={columns}
                getRowHeight={() => 'auto'}
                autoHeight
                headerHeight={46}
                hideFooter
                disableColumnMenu
                disableColumnReorder
                disableColumnResize
                disableColumnSelector
                disableSelectionOnClick
                loading={isLoading}
                onRowClick={({ row }) => handleRowClick(row)}
            />
        </Paper>
    );
};

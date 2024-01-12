// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { DataGridCustomToolbar, dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { TableListingEntry } from '../../../../../../../apis/integrations/generated';

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
        <DataGridWrapper sx={{ mt: 3 }}>
            <DataGridPro
                {...dataGridDefaultProps}
                rows={dataGridListing}
                columns={columns}
                loading={isLoading}
                onRowClick={({ row }) => handleRowClick(row)}
                components={{
                    Toolbar: () => <DataGridCustomToolbar title={`Select the table you'd like to map`} />
                }}
            />
        </DataGridWrapper>
    );
};

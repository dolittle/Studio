// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef, GridSelectionModel, GridRowId, useGridApiRef } from '@mui/x-data-grid-pro';

import { MappableTableColumn } from '../../../../../../apis/integrations/generated';

export type DataGridTableListingEntry = MappableTableColumn & {
    id: string;
    fieldName: string;
};

const columns: GridColDef<DataGridTableListingEntry>[] = [
    {
        field: 'm3ColumnName',
        headerName: 'M3 Field Name',
        minWidth: 270,
    },
    {
        field: 'm3Description',
        headerName: 'M3 Description',
        editable: true,
        minWidth: 270,
    },
    {
        field: 'fieldName',
        headerName: 'Remapped Name',
        editable: true,
        minWidth: 270,
    },
];

export type MessageMappingTableProps = {
    dataGridListing: DataGridTableListingEntry[];
    selectedIds: GridSelectionModel;
    onSelectedIdsChanged: (newSelectedIds: GridSelectionModel) => void;
    disabledRows?: GridRowId[];
    isLoading: boolean;
    hideUnselectedRows?: boolean;
    onFieldMapped: (m3Field: string, mappedFieldName) => void;
};

export const MessageMappingTable = ({
    dataGridListing,
    selectedIds,
    onSelectedIdsChanged,
    disabledRows,
    isLoading,
    onFieldMapped
}: MessageMappingTableProps) => {

    const gridApiRef = useGridApiRef();

    const processRowUpdate = (
        newRow: DataGridTableListingEntry,
        oldRow: DataGridTableListingEntry
    ): DataGridTableListingEntry | Promise<DataGridTableListingEntry> => {
        onFieldMapped(newRow.id, newRow.fieldName);
        gridApiRef.current.selectRow(newRow.id, true);
        return newRow;
    };

    return (
        <Paper elevation={0} sx={{ width: 1, boxShadow: 'none' }}>
            <DataGridPro
                apiRef={gridApiRef}
                rows={dataGridListing}
                columns={columns}
                getRowHeight={() => 'auto'}
                autoHeight
                headerHeight={46}
                checkboxSelection
                onSelectionModelChange={onSelectedIdsChanged}
                selectionModel={selectedIds}
                isRowSelectable={row => !disabledRows?.includes(row.id) || false}
                loading={isLoading}
                pagination
                pageSize={10}
                rowsPerPageOptions={[10]}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={error => console.log(error)}
                experimentalFeatures={{ newEditingApi: true }}
                disableColumnMenu
                disableColumnReorder
                disableColumnResize
                disableColumnSelector
                disableSelectionOnClick
            />
        </Paper>
    );
};

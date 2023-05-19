// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef, GridSelectionModel, GridRowId, useGridApiRef } from '@mui/x-data-grid-pro';

import { EditCell, EditTextFieldCell } from '@dolittle/design-system';

import { MappableTableColumn } from '../../../../../../apis/integrations/generated';
import { toPascalCase } from '../../../../../../utils/helpers/strings';
import { generateMappedFieldNameFrom } from './generateMappedFieldNameFrom';

export type DataGridTableListingEntry = MappableTableColumn & {
    id: string;
    fieldName: string;
};

export type MessageMappingTableProps = {
    dataGridListing: DataGridTableListingEntry[];
    selectedIds: GridSelectionModel;
    onSelectedIdsChanged: (newSelectedIds: GridSelectionModel) => void;
    disabledRows?: GridRowId[];
    isLoading: boolean;
    hideUnselectedRows?: boolean;
    onFieldMapped: (m3Field: string, mappedFieldName) => void;
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
        minWidth: 270,
    },
    {
        field: 'fieldName',
        headerName: 'Remapped Name',
        editable: true,
        minWidth: 270,
        renderCell: EditCell,
        renderEditCell: EditTextFieldCell,
    },
];

export const MessageMappingTable = ({
    dataGridListing,
    selectedIds,
    onSelectedIdsChanged,
    disabledRows,
    isLoading,
    onFieldMapped,
}: MessageMappingTableProps) => {

    const gridApiRef = useGridApiRef();

    const generateUniqueFieldName = (gridApiRef, fieldName: string, m3ColumnName: string) => {
        const existingMappedFields = Array
            .from(gridApiRef.current?.getSelectedRows() as Map<GridRowId, DataGridTableListingEntry>)
            .map(([, row]) => row.fieldName) || [];
        const machineReadableFieldName = generateMappedFieldNameFrom(toPascalCase(fieldName), m3ColumnName, existingMappedFields);
        return machineReadableFieldName;
    };

    /**
     * Callback for when the user changes the selection in the grid.
     * Updates based on previous selection state, and notifies parent of field mapping changes.
     * Generates a unique field name for the newly selected rows.
     * @param newSelectedModel List of selected row ids for every selection change made.
     */
    const onSelectedModelChanged = (newSelectedModel: GridSelectionModel) => {
        const newlySelectedIds = newSelectedModel.filter(id => !selectedIds.includes(id));
        const removedIds = selectedIds.filter(id => !newSelectedModel.includes(id));

        newlySelectedIds
            .filter(id => gridApiRef.current.getCellMode(id, 'fieldName') !== 'edit')
            .forEach(id => {
                const row = gridApiRef.current.getRow(id) as DataGridTableListingEntry;
                const fieldName = generateUniqueFieldName(gridApiRef, row.m3Description, row.m3ColumnName);
                row.fieldName = fieldName;
                onFieldMapped(id as string, fieldName);
            });

        removedIds.forEach(id => {
            const row = gridApiRef.current.getRow(id) as DataGridTableListingEntry;
            row.fieldName = '';
            onFieldMapped(id as string, '');
        });

        onSelectedIdsChanged(newSelectedModel);
    };

    /**
     * Process row update after user has edited the Remapped name column.
     * Sanitizes the fieldName, and checks if it is unique, selects the row if it is not and notifies parent that field has been mapped.
     * @param newRow New row data.
     * @param oldRow Old row data.
     * @returns new row data.
     */
    const processRowUpdate = (
        newRow: DataGridTableListingEntry,
        oldRow: DataGridTableListingEntry,
    ): DataGridTableListingEntry | Promise<DataGridTableListingEntry> => {
        if (newRow.fieldName === oldRow.fieldName) {
            return newRow;
        }

        const machineReadableFieldName = generateUniqueFieldName(gridApiRef, newRow.fieldName, newRow.m3ColumnName);
        onFieldMapped(newRow.id, machineReadableFieldName);

        const isSelected = gridApiRef.current.isRowSelected(oldRow.id);
        const shouldDeselect = isSelected && !machineReadableFieldName;
        const shouldSelect = !isSelected && !!machineReadableFieldName;

        if (shouldSelect) {
            gridApiRef.current.selectRow(newRow.id, true);
        }

        if (shouldDeselect) {
            gridApiRef.current.selectRow(newRow.id, false);
        }

        return { ...newRow, fieldName: machineReadableFieldName };
    };

    return (
        <Paper elevation={0} sx={{ width: 1, height: 400, boxShadow: 'none' }}>
            <DataGridPro
                apiRef={gridApiRef}
                rows={dataGridListing}
                columns={columns}
                getRowHeight={() => 'auto'}
                headerHeight={46}
                checkboxSelection
                onSelectionModelChange={onSelectedModelChanged}
                selectionModel={selectedIds}
                isRowSelectable={row => !disabledRows?.includes(row.id) || false}
                loading={isLoading}
                initialState={{
                    pagination: {
                        //@ts-ignore
                        paginationModel: {
                            pageSize: 25,
                            page: 0,
                        },
                    },
                }}
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

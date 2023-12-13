// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';

import { DataGridPro, GridSelectionModel, GridRowId, useGridApiRef, GRID_CHECKBOX_SELECTION_FIELD } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper } from '@dolittle/design-system';

import { DataGridTableListingEntry, messageMappingDataGridColumns } from './MessageMappingDataGridColumns';

import { generateUniqueFieldName } from './helpers';

export type MessageMappingDataGridProps = {
    dataGridListing: DataGridTableListingEntry[];
    selectedIds: GridSelectionModel;
    onSelectedIdsChanged: (newSelectedIds: GridSelectionModel) => void;
    disabledRows: GridRowId[];
    isLoading: boolean;
    showOnlySelected: boolean;
    onFieldMapped: (m3Field: string, mappedFieldName) => void;
    quickFilterValue?: string;
};

export const MessageMappingDataGrid = ({ dataGridListing, selectedIds, onSelectedIdsChanged, disabledRows, isLoading, onFieldMapped, showOnlySelected, quickFilterValue }: MessageMappingDataGridProps) => {
    const gridApiRef = useGridApiRef();

    const columns = useMemo(() => messageMappingDataGridColumns(disabledRows), [disabledRows]);

    const gridFilters = useMemo(() => {
        return {
            items: showOnlySelected ? [
                {
                    columnField: GRID_CHECKBOX_SELECTION_FIELD,
                    operatorValue: 'is',
                    value: 'true',
                }
            ] : [],
            quickFilterValues: [quickFilterValue?.trim() || undefined]
        };
    }, [quickFilterValue, showOnlySelected]);

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
    const processRowUpdate = (newRow: DataGridTableListingEntry, oldRow: DataGridTableListingEntry): DataGridTableListingEntry | Promise<DataGridTableListingEntry> => {
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
        <DataGridWrapper background='dark' sx={{ height: 400 }}>
            <DataGridPro
                {...dataGridDefaultProps}
                apiRef={gridApiRef}
                rows={dataGridListing}
                columns={columns}
                autoHeight={false}
                hideFooter={false}
                checkboxSelection
                selectionModel={selectedIds}
                onSelectionModelChange={onSelectedModelChanged}
                isRowSelectable={row => !disabledRows?.includes(row.id) || false}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={error => console.log(error)}
                filterModel={gridFilters}
                loading={isLoading}
                keepNonExistentRowsSelected
                experimentalFeatures={{ newEditingApi: true }}
                initialState={{
                    pagination: {
                        //@ts-ignore
                        paginationModel: {
                            pageSize: 25,
                            page: 0,
                        },
                    },
                }}
            />
        </DataGridWrapper>
    );
};

// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useMemo, useState } from 'react';

import { DataGridPro, GridFilterModel, GridSelectionModel, useGridApiRef, GRID_CHECKBOX_SELECTION_FIELD } from '@mui/x-data-grid-pro';

import { dataGridDefaultProps, DataGridWrapper, DataGridCustomToolbar, NewSwitch } from '@dolittle/design-system';

import { FieldMapping, MappedField } from '../../../../../../../../../apis/integrations/generated';

import { DataGridTableListingEntry, getMessageMappingDataGridColumns } from './MessageMappingDataGridColumns';

import { generateMappedFieldNameFrom } from '../../../../components/generateMappedFieldNameFrom';
import { useUpdateMappedFieldsInForm } from '../../../../components/useUpdateMappedFieldsInForm';

import { generateUniqueFieldName } from './helpers';

export type MessageMappingDataGridProps = {
    tableName: string;
    mappableTableDataGridRows: any;
    shouldHideUnselectedRows: boolean;
    onHideUnselectedRowsChange: (hideUnselectedRows: boolean) => void;
    quickFilterValue: string;
    initialSelectedFields: MappedField[];
    mappableTableResult: any;
    isLoading: boolean;
};

export const MessageMappingDataGrid = ({ tableName, mappableTableDataGridRows, shouldHideUnselectedRows, onHideUnselectedRowsChange, quickFilterValue, initialSelectedFields, mappableTableResult, isLoading }: MessageMappingDataGridProps) => {
    const gridApiRef = useGridApiRef();
    const setMappedFieldsInForm = useUpdateMappedFieldsInForm();

    const initialSelectedRowIds = useMemo(
        () => initialSelectedFields.map(field => field.mappedColumn?.m3ColumnName) || [],
        [initialSelectedFields]
    );

    const initialMappedFields: Map<string, FieldMapping> = useMemo(() => new Map(
        initialSelectedFields.map(
            field => [
                field.mappedColumn?.m3ColumnName, {
                    columnName: field.mappedColumn?.m3ColumnName,
                    fieldName: field.mappedName,
                    fieldDescription: field.mappedDescription,
                }]) || []),
        [initialSelectedFields]
    );

    const [hasSetInitialState, setHasSetInitialState] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>(initialSelectedRowIds);
    const [mappedFields, setMappedFields] = useState<Map<string, FieldMapping>>(initialMappedFields);

    if (!hasSetInitialState) {
        setMappedFieldsInForm(mappedFields, true);
        setHasSetInitialState(true);
    }

    const requiredTableColumns = mappableTableResult?.value?.required || [];
    const requiredTableColumnIds = requiredTableColumns.map(required => required.m3ColumnName);
    const selectedIds = (selectedRowIds.length > 0) ? selectedRowIds : requiredTableColumnIds as GridSelectionModel;

    const messageMappingDataGridRows: DataGridTableListingEntry[] = useMemo(() => mappableTableDataGridRows.map(column => ({
        id: column.m3ColumnName,
        fieldName: mappedFields.get(column.m3ColumnName)?.fieldName || '',
        ...column,
    })), [mappableTableDataGridRows, mappedFields]);

    const messageMappingDataGridColumns = useMemo(() => getMessageMappingDataGridColumns(requiredTableColumnIds), [requiredTableColumnIds]);

    const updateMappedFieldsAndUpdateFormValue = (m3Field: string, mappedFieldName: any) => {
        setMappedFields(prevMappedFields => {
            const newMappedFields = new Map(prevMappedFields);

            mappedFieldName
                ? newMappedFields.set(m3Field, { columnName: m3Field, fieldName: mappedFieldName })
                : newMappedFields.delete(m3Field);
            setMappedFieldsInForm(newMappedFields);
            return newMappedFields;
        });
    };

    useEffect(() => {
        messageMappingDataGridRows.forEach(column => {
            const isRequiredAndUnmapped = requiredTableColumnIds.includes(column.m3ColumnName) && !mappedFields.has(column.m3ColumnName);
            if (isRequiredAndUnmapped) {
                const generatedName = generateMappedFieldNameFrom(column.m3Description, column.m3ColumnName, Array.from(mappedFields.keys()));
                updateMappedFieldsAndUpdateFormValue(column.m3ColumnName, generatedName);
            }
        });
    }, [messageMappingDataGridRows, requiredTableColumnIds, mappedFields, generateMappedFieldNameFrom]);

    const gridFilters: GridFilterModel = useMemo(() => {
        return {
            // Hide unselected rows. In 'edit' mode, this is initially set to true.
            items: shouldHideUnselectedRows ? [
                {
                    columnField: GRID_CHECKBOX_SELECTION_FIELD,
                    operatorValue: 'is',
                    value: 'true',
                },
            ] : [],
            // Apply search term if provided.
            quickFilterValues: [quickFilterValue?.trim() || undefined],
        };
    }, [quickFilterValue, shouldHideUnselectedRows]);

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
                updateMappedFieldsAndUpdateFormValue(id as string, fieldName);
            });

        removedIds.forEach(id => {
            const row = gridApiRef.current.getRow(id) as DataGridTableListingEntry;
            row.fieldName = '';
            updateMappedFieldsAndUpdateFormValue(id as string, '');
        });

        setSelectedRowIds(newSelectedModel);
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
        updateMappedFieldsAndUpdateFormValue(newRow.id, machineReadableFieldName);

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
                rows={messageMappingDataGridRows}
                columns={messageMappingDataGridColumns}
                autoHeight={false}
                hideFooter={false}
                checkboxSelection
                selectionModel={selectedIds}
                onSelectionModelChange={onSelectedModelChanged}
                isRowSelectable={row => !requiredTableColumnIds?.includes(row.id) || false}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={error => console.log(error)}
                filterModel={gridFilters}
                loading={isLoading}
                keepNonExistentRowsSelected
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    Toolbar: () => (
                        <DataGridCustomToolbar title={`${tableName} table fields`}>
                            <NewSwitch
                                id='hideUnselectedRows'
                                label='Hide Unselected Rows'
                                checked={shouldHideUnselectedRows}
                                onChange={event => onHideUnselectedRowsChange(event.target.checked)}
                            />
                        </DataGridCustomToolbar>
                    )
                }}
                sx={{
                    // Hide the filter icon in the column header.
                    '& .MuiDataGrid-columnHeader--filtered .MuiDataGrid-iconButtonContainer': {
                        display: 'none',
                    },
                }}
            />
        </DataGridWrapper>
    );
};

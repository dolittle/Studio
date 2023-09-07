// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useMemo, useEffect } from 'react';

import { Grid, LinearProgress, Box } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { AlertBox, Button, ContentSection, NewSwitch, TextField } from '@dolittle/design-system/';

import { FieldMapping, MappedField } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionIdFromRoute } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { DataGridTableListingEntry, MessageMappingTable } from './MessageMappingTable';
import { useUpdateMappedFieldsInForm } from './useUpdateMappedFieldsInForm';
import { generateMappedFieldNameFrom } from './generateMappedFieldNameFrom';

export type TableSectionProps = ViewModeProps & {
    selectedTableName: string;
    initialSelectedFields: MappedField[];
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = ({ selectedTableName, initialSelectedFields, onBackToSearchResultsClicked, mode }: TableSectionProps) => {
    const connectionId = useConnectionIdFromRoute();
    const setMappedFieldsInForm = useUpdateMappedFieldsInForm();
    const [fieldSearchTerm, setFieldSearchTerm] = useState('');

    if (!selectedTableName) return <AlertBox />;

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

    const [mappedFields, setMappedFields] = useState<Map<string, FieldMapping>>(initialMappedFields);
    const [hasSetInitialState, setHasSetInitialState] = useState(false);
    if (!hasSetInitialState) {
        setMappedFieldsInForm(mappedFields, true);
        setHasSetInitialState(true);
    }

    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>(initialSelectedRowIds);
    const [hideUnselectedRows, setHideUnselectedRows] = useState(mode === 'edit');

    const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
        id: connectionId,
        table: selectedTableName,
    });

    const allMappableTableColumns = mappableTableResult?.value?.columns || [];
    const requiredTableColumns = mappableTableResult?.value?.required || [];
    const requiredTableColumnIds = requiredTableColumns.map(required => required.m3ColumnName);
    const selectedIds = (selectedRowIds.length > 0) ? selectedRowIds : requiredTableColumnIds as GridSelectionModel;

    const gridMappableTableColumns: DataGridTableListingEntry[] = useMemo(
        () => allMappableTableColumns.map(column => ({
            id: column.m3ColumnName,
            fieldName: mappedFields.get(column.m3ColumnName)?.fieldName || '',
            ...column,
        })),
        [allMappableTableColumns, mappedFields]
    );

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
        gridMappableTableColumns.forEach(column => {
            const isRequiredAndUnmapped = requiredTableColumnIds.includes(column.m3ColumnName) && !mappedFields.has(column.m3ColumnName);
            if (isRequiredAndUnmapped) {
                const generatedName = generateMappedFieldNameFrom(column.m3Description, column.m3ColumnName, Array.from(mappedFields.keys()));
                updateMappedFieldsAndUpdateFormValue(column.m3ColumnName, generatedName);
            }
        });
    }, [gridMappableTableColumns, requiredTableColumnIds, mappedFields, generateMappedFieldNameFrom]);

    return (
        <>
            {isInitialLoading ? <LinearProgress /> : (
                <ContentSection
                    title={`${selectedTableName} Table`}
                    beforeHeaderSlot={
                        mode === 'new' &&
                        <Button
                            label='Back to Search Results'
                            startWithIcon='ArrowBack'
                            variant='text'
                            color='subtle'
                            sx={{ ml: 1, mt: 2 }}
                            onClick={onBackToSearchResultsClicked}
                        />
                    }
                >
                    {!mappableTableResult?.value ? <AlertBox /> : (
                        <>
                            <Box sx={{ py: 3 }}>
                                {`This displays all the M3 fields available for this table. Primary fields are necessary for the message type and have already been selected.
                                You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic. `}
                            </Box>
                            <Grid container gap={4} sx={{ py: 3, justifyContent: 'space-between', justifyItems: 'center', }}>
                                <TextField
                                    startIcon='Search'
                                    variant='outlined'
                                    placeholder='Search fields'
                                    onValueChange={(event) => setFieldSearchTerm(event.target.value)}
                                />
                                <NewSwitch
                                    id='hideUnselectedRows'
                                    label='Hide Unselected Rows'
                                    checked={hideUnselectedRows}
                                    onChange={() => setHideUnselectedRows(!hideUnselectedRows)}
                                />
                            </Grid>
                            <MessageMappingTable
                                dataGridListing={gridMappableTableColumns}
                                isLoading={isLoading}
                                selectedIds={selectedIds}
                                disabledRows={requiredTableColumnIds}
                                onSelectedIdsChanged={setSelectedRowIds}
                                onFieldMapped={updateMappedFieldsAndUpdateFormValue}
                                quickFilterValue={fieldSearchTerm}
                                showOnlySelected={!hideUnselectedRows}
                            />
                        </>
                    )}
                </ContentSection>
            )}
        </>
    );
};


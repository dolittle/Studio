// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useMemo, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Grid, LinearProgress, Box } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { AlertBox, Button, Switch } from '@dolittle/design-system/';
import { ContentSection } from '../../../../../../components/layout/Content/ContentSection';

import { FieldMapping, MappedField } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionId } from '../../../../../routes.hooks';
import { toPascalCase } from '../../../../../../utils/helpers/strings';

import { ViewModeProps } from '../ViewMode';
import { DataGridTableListingEntry, MessageMappingTable } from './MessageMappingTable';


export type TableSectionProps = ViewModeProps & {
    selectedTableName: string;
    initialSelectedFields: MappedField[];
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = ({ selectedTableName, initialSelectedFields, onBackToSearchResultsClicked, mode }: TableSectionProps) => {
    const connectionId = useConnectionId();

    if (!connectionId || !selectedTableName) {
        return <AlertBox />;
    }

    const initialSelected = useMemo(
        () => initialSelectedFields.map(field => field.mappedColumn?.m3ColumnName) || [],
        [initialSelectedFields]
    );

    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>(initialSelected);
    const [hideUnselectedRows, setHideUnselectedRows] = useState(mode === 'edit');

    const initialMapped: Map<string, FieldMapping> = useMemo(() => new Map(
        initialSelectedFields.map(
            field => [
                field.mappedColumn?.m3ColumnName, {
                    columnName: field.mappedColumn?.m3ColumnName,
                    fieldName: field.mappedName,
                    fieldDescription: field.mappedDescription,
                }]) || []),
        [initialSelectedFields]);

    const [mappedFields, setMappedFields] = useState<Map<string, FieldMapping>>(initialMapped);
    const { setValue: setFormValue } = useFormContext();


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

    const selectedTableColumns = useMemo(
        () => gridMappableTableColumns.filter(column => selectedIds.includes(column.m3ColumnName)),
        [gridMappableTableColumns, selectedIds]
    );

    const generateMappedFieldNameFrom = (columnDescription: string, uniqueMappedNames: string[]) => {
        let generated = toPascalCase(columnDescription);
        let isUnique = true;
        let suffixNumber = 0;

        while (isUnique) {
            if (uniqueMappedNames.includes(generated + (suffixNumber > 0 ? suffixNumber.toString() : ''))) {
                suffixNumber++;
            } else {
                if (suffixNumber > 0) {
                    generated = generated + suffixNumber;
                }
                isUnique = false;
            }
        }
        return generated;
    };


    useEffect(() => {
        const uniqueMappedNames = new Set(selectedTableColumns.map(column => column.fieldName));
        selectedTableColumns
            .filter(column => !column.fieldName)
            .forEach(column => {
                const fieldName = generateMappedFieldNameFrom(column.m3Description, [...uniqueMappedNames]);
                uniqueMappedNames.add(fieldName);
                column.fieldName = fieldName;
            });

        gridMappableTableColumns
            .filter(column => column.fieldName)
            .filter(column => !selectedTableColumns.map(c => c.m3ColumnName).includes(column.m3ColumnName))
            .forEach(column => column.fieldName = '');

        const fields: FieldMapping[] = selectedTableColumns.map(column => ({
            columnName: column.m3ColumnName,
            fieldName: column.fieldName,
            fieldDescription: '',
        }));
        setFormValue('fields', fields);
    }, [selectedTableColumns]);

    const updateMappedFields = (m3Field: string, mappedFieldName: any) => {
        setMappedFields(prevMappedFields => {
            const newMappedFields = new Map(prevMappedFields);

            if (mappedFieldName) {
                newMappedFields.set(m3Field, { columnName: m3Field, fieldName: mappedFieldName });
            } else {
                newMappedFields.delete(m3Field);
            }
            return newMappedFields;
        });
    };

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
                            <Grid container gap={2} sx={{ py: 3, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                                <Switch id='hideUnselectedRows' label='Hide Unselected Rows' onChange={() => setHideUnselectedRows(!hideUnselectedRows)} />
                            </Grid>
                            <MessageMappingTable
                                dataGridListing={hideUnselectedRows ? selectedTableColumns : gridMappableTableColumns}
                                isLoading={isLoading}
                                selectedIds={selectedIds}
                                disabledRows={requiredTableColumnIds}
                                onSelectedIdsChanged={setSelectedRowIds}
                                onFieldMapped={updateMappedFields}
                            />
                        </>
                    )}
                </ContentSection>
            )}
        </>
    );
};

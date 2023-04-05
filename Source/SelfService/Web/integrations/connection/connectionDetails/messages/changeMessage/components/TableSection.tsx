// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useMemo, useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Grid, LinearProgress } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid-pro';
import { AlertBox, Button, Icon, MaxWidthTextBlock, Switch } from '@dolittle/design-system/';

import { FieldMapping, MappedField, TableListingEntry } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';

import { useConnectionId } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';
import { DataGridTableListingEntry, MessageMappingTable } from './MessageMappingTable';


export type TableSectionProps = ViewModeProps & {
    selectedTableName: string;
    initialSelectedFields: MappedField[];
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = (props: TableSectionProps) => {
    const connectionId = useConnectionId();
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
    const [hideUnselectedRows, setHideUnselectedRows] = useState(props.mode === 'edit');

    const [mappedFields, setMappedFields] = useState<Map<string, FieldMapping>>(new Map());
    const { setValue } = useFormContext();

    if (!connectionId || !props.selectedTableName) return <AlertBox />;

    const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
        id: connectionId,
        table: props.selectedTableName,
    });

    const allMappableTableColumns = mappableTableResult?.value?.columns || [];
    const requiredTableColumns = mappableTableResult?.value?.required || [];
    const requiredTableColumnIds = requiredTableColumns.map(required => required.m3ColumnName!);
    const selectedIds = (selectedRowIds.length > 0) ? selectedRowIds : requiredTableColumnIds as GridSelectionModel;

    const gridMappableTableColumns: DataGridTableListingEntry[] = useMemo(
        () => allMappableTableColumns.map(column => ({
            id: column.m3ColumnName!,
            fieldName: mappedFields.get(column.m3ColumnName!)?.fieldName || '',
            ...column,
        })),
        [allMappableTableColumns, mappedFields]
    );

    const selectedTableColumns = useMemo(
        () => gridMappableTableColumns.filter(column => selectedIds.includes(column.m3ColumnName!)),
        [allMappableTableColumns, selectedIds]
    );

    const initialMapped: Map<string, FieldMapping> = useMemo(() => new Map(
        props.initialSelectedFields.map(
            field => [
                field.mappedColumn?.m3ColumnName!, {
                    columnName: field.mappedColumn?.m3ColumnName!,
                    fieldName: field.mappedName,
                    fieldDescription: field.mappedDescription,
                }]) || []),
        [props.initialSelectedFields]);

    useEffect(() => {
        setMappedFields(initialMapped);
    }, [initialMapped]);

    const initialSelected = useMemo(
        () => props.initialSelectedFields.map(field => field.mappedColumn?.m3ColumnName!) || [],
        [props.initialSelectedFields]
    );
    useEffect(() => {
        setSelectedRowIds(initialSelected);
    }, [initialSelected]);

    useEffect(() => {
        const fields: FieldMapping[] = selectedTableColumns.map(column => ({
            columnName: column.m3ColumnName!,
            fieldName: column.fieldName,
            fieldDescription: '',
        }));
        setValue('fields', fields);
    }, [selectedTableColumns]);

    const onFieldMapped = (m3Field: string, mappedFieldName: any) => {
        setMappedFields((prevMappedFields) => {
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
                    title={`${props.selectedTableName} Table`}
                    beforeHeaderSlot={
                        <Button
                            label='Back to Search Results'
                            startWithIcon={<Icon icon='ArrowBack' />}
                            variant='text'
                            color='subtle'
                            sx={{ ml: 1, mt: 2 }}
                            onClick={props.onBackToSearchResultsClicked}
                        />
                    }
                >
                    {!mappableTableResult?.value ? <AlertBox /> : (
                        <>
                            <Grid container gap={2} sx={{ py: 3, justifyContent: 'space-between', alignContent: 'flex-start' }}>
                                <MaxWidthTextBlock>
                                    {`You can edit the field descriptions and add a remapped name to provide appropriate semantics that make sense for your
                        organization's business logic.`}
                                </MaxWidthTextBlock>
                                <Switch id='hideUnselectedRows' label='Hide Unselected Rows' onChange={() => setHideUnselectedRows(!hideUnselectedRows)} />
                            </Grid>
                            <MessageMappingTable
                                dataGridListing={hideUnselectedRows ? selectedTableColumns : gridMappableTableColumns}
                                isLoading={isLoading}
                                selectedIds={selectedIds}
                                disabledRows={requiredTableColumnIds}
                                onSelectedIdsChanged={setSelectedRowIds}
                                onFieldMapped={onFieldMapped}
                            />
                        </>
                    )}
                </ContentSection>
            )}
        </>
    );
};

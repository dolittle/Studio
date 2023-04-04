// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useMemo } from 'react';

import { Grid, LinearProgress } from '@mui/material';

import { AlertBox, Button, Icon, MaxWidthTextBlock, Switch } from '@dolittle/design-system/';
import { GridSelectionModel } from '@mui/x-data-grid-pro';

import { TableListingEntry } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesTableGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';

import { useConnectionId } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';
import { MessageMappingTable } from './MessageMappingTable';
import { SubmitButtonSection } from './SubmitButtonSection';

export type TableSectionProps = ViewModeProps & {
    selectedTable: TableListingEntry;
    onBackToSearchResultsClicked: () => void;
};

export const TableSection = (props: TableSectionProps) => {
    const connectionId = useConnectionId();
    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
    const [hideUnselectedRows, setHideUnselectedRows] = useState(false);

    if (!connectionId || !props.selectedTable.name) return <AlertBox />;

    const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
        id: connectionId,
        table: props.selectedTable.name,
    });

    if (isInitialLoading) return <LinearProgress />;
    if (!mappableTableResult?.value) return <AlertBox />;

    const allMappableTableColumns = mappableTableResult.value.columns || [];
    const requiredTableColumns = mappableTableResult.value.required || [];
    const preselectedInitialIds = requiredTableColumns.map(required => required.m3ColumnName!);
    const selectedIds = (selectedRowIds.length > 0) ? selectedRowIds : preselectedInitialIds as GridSelectionModel;
    const selectedTableColumns = allMappableTableColumns.filter(column => selectedIds.includes(column.m3ColumnName!));

    return (
        <ContentSection
            title={`${props.selectedTable.name} Table`}
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
            <Grid container gap={2} sx={{ py: 3, justifyContent: 'space-between', alignContent: 'flex-start' }}>
                <MaxWidthTextBlock>
                    {`You can edit the field descriptions and add a remapped name to provide appropriate semantics that make sense for your
                organization's business logic.`}
                </MaxWidthTextBlock>

                <Switch id='hideUnselectedRows' label='Hide Unselected Rows' onChange={() => setHideUnselectedRows(!hideUnselectedRows)} />
            </Grid>

            <MessageMappingTable
                mappableTableColumns={hideUnselectedRows ? selectedTableColumns : allMappableTableColumns}
                isLoading={isLoading}
                selectedIds={selectedIds}
                disabledRows={preselectedInitialIds}
                onSelectedIdsChanged={setSelectedRowIds}
            />

            <SubmitButtonSection mode={props.mode} isSubmitting={false} />
        </ContentSection>
    );
};

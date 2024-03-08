// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { DataGridPro, GridFilterModel, GridRowId } from '@mui/x-data-grid-pro';

import { AlertBox, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, TextField } from '@dolittle/design-system';

import { useConnectionsIdMetadataProgramsProgramProgramGet } from '../../../../../../apis/integrations/programMetadataApi.hooks';

import { useConnectionIdFromRoute } from '../../../../../routes.hooks';

import { programTransactionColumns } from './TransactionsDataGridColumns';

export type TransactionsDataGridProps = {
    selectedProgramName: string;
    selectedTransactionName: GridRowId[];
    onSelectedTransactionNameChanged: (newSelectedTransactionName: GridRowId[]) => void;
};

export const TransactionsDataGrid = ({ selectedProgramName, selectedTransactionName, onSelectedTransactionNameChanged }: TransactionsDataGridProps) => {
    const connectionId = useConnectionIdFromRoute();

    const [quickFilterValue, setQuickFilterValue] = useState('');

    const { data: programTransactionsResult, isLoading, isError } = useConnectionsIdMetadataProgramsProgramProgramGet({
        id: connectionId,
        program: selectedProgramName,
    });

    const transactionRows = programTransactionsResult?.transactions || [];

    const displaySelectedTransactionName = selectedTransactionName.length ? `Selected transaction: ${selectedTransactionName[0]}` : '';

    const gridFilters: GridFilterModel = useMemo(() => {
        return {
            items: [],
            // Apply search term if provided.
            quickFilterValues: [quickFilterValue?.trim() || undefined],
        };
    }, [quickFilterValue]);

    if (isError) return <AlertBox />;

    return (
        <>
            <TextField
                placeholder='Search API (transaction)'
                isFullWidth
                startIcon='Search'
                variant='outlined'
                onValueChange={event => setQuickFilterValue(event.target.value)}
            />

            <DataGridWrapper background='dark' sx={{ height: 300, mt: 3 }}>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={transactionRows}
                    columns={programTransactionColumns}
                    getRowId={row => row.name}
                    autoHeight={false}
                    loading={isLoading}
                    disableSelectionOnClick={false}
                    filterModel={gridFilters}
                    selectionModel={selectedTransactionName}
                    onSelectionModelChange={newSelection => onSelectedTransactionNameChanged(newSelection)}
                    components={{
                        Toolbar: () => <DataGridCustomToolbar title='Transactions'>{displaySelectedTransactionName}</DataGridCustomToolbar>
                    }}
                />
            </DataGridWrapper>
        </>
    );
};

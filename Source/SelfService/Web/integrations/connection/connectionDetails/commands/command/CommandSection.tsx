// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { Typography } from '@mui/material';
import { DataGridPro, GridColDef, GridFilterModel, GridRowId } from '@mui/x-data-grid-pro';

import { AlertBox, Button, ContentDivider, ContentWithSubtitle, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, TextField } from '@dolittle/design-system';

import { useConnectionsIdMetadataProgramsProgramProgramGet } from '../../../../../apis/integrations/programMetadataApi.hooks';

type ProgramTransaction = {
    name: string;
    description: string;
};

const programTransactionColumns: GridColDef<ProgramTransaction>[] = [
    {
        field: 'name',
        headerName: 'Transaction name',
        minWidth: 400,
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 400,
    },
];

export type CommandSectionProps = {
    connectionId: string;
    selectedProgramName: string;
    selectedTransactionName: GridRowId[];
    onSelectedTransactionNameChanged: (newSelectedTransactionName: GridRowId[]) => void;
    onBackToSearchResultsClicked: () => void;
};

export const CommandSection = ({ connectionId, selectedProgramName, selectedTransactionName, onSelectedTransactionNameChanged, onBackToSearchResultsClicked }: CommandSectionProps) => {
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

    return (
        <ContentWithSubtitle
            title={`Selected program: ${selectedProgramName}`}
            rightAction={
                <Button label='Back To Search Results' startWithIcon='ArrowBack' color='subtle' onClick={onBackToSearchResultsClicked} />
            }
        >
            <Typography sx={{ mb: 4 }}>{`This displays all the transactions that are available for '${selectedProgramName}' program.`}</Typography>

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

            <ContentDivider sx={{ mt: 3 }} />

            <Button label='Save New Command' variant='fullwidth' type='submit' disabled={!selectedTransactionName.length} sx={{ mt: 2 }} />
        </ContentWithSubtitle>
    );
};

// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { AlertBox, ContentWithSubtitle, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, TextField } from '@dolittle/design-system';

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

const programTransactionDummyData: ProgramTransaction[] = [
    {
        name: 'GetCustomer',
        description: 'Get customer details',
    },
    {
        name: 'GetPayment',
        description: 'Get payment details',
    },
    {
        name: 'GetProduct',
        description: 'Get product details',
    },
];

export type CommandSectionProps = {
    connectionId: string;
    selectedProgramName: string;
    onBackToSearchResultsClicked?: () => void;
};

export const CommandSection = ({ connectionId, selectedProgramName }: CommandSectionProps) => {

    // TODO: Needs error handling.
    const query = useConnectionsIdMetadataProgramsProgramProgramGet({ id: connectionId, program: selectedProgramName });

    // const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
    //     id: connectionId,
    //     table: selectedTableName,
    // });

    const searchResults = query.data || [];

    console.log('searchResults', searchResults);

    return (
        <ContentWithSubtitle
            title={`Selected program: ${selectedProgramName}`}
            infoTooltipLabel={`This displays all the transactions that are available for '${selectedProgramName}' program.`}
        // rightAction={mode === 'new' &&
        //     <Button
        //         label='Back to Search Results'
        //         startWithIcon='ArrowBack'
        //         variant='text'
        //         color='subtle'
        //         onClick={onBackToSearchResultsClicked}
        //     />
        // }
        >
            <Typography sx={{ mb: 4 }}>(Add some text here)</Typography>

            <TextField
                placeholder='Search API (transaction)'
                isFullWidth
                startIcon='Search'
                variant='outlined'
                onValueChange={() => { }}
            />

            <DataGridWrapper background='dark' sx={{ height: 400, mt: 3 }}>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={programTransactionDummyData}
                    columns={programTransactionColumns}
                    getRowId={row => row.name}
                    checkboxSelection // TODO: Only one row can be selected at a time.
                    components={{
                        Toolbar: () => <DataGridCustomToolbar title='Transactions:' />
                    }}
                />
            </DataGridWrapper>
        </ContentWithSubtitle>
    );
};

// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

//import { useLocation, useParams } from 'react-router-dom';

import { Collapse, Typography } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { AlertBox, ContentContainer, ContentHeader, ContentWithSubtitle, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, Form, InlineWrapper, Input, TextField } from '@dolittle/design-system';

import { useConnectionsIdMetadataProgramsSearchGet } from '../../../../../apis/integrations/programMetadataApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';

import { alphaNumericCharsRegex } from '../../../../../utils/helpers/regex';

type ProgramsListingEntry = {
    name: string;
    description: string;
    transactionCount: string;
};

const programListingColumns: GridColDef<ProgramsListingEntry>[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 352,
    },
    {
        field: 'transactionCount',
        headerName: 'Transaction count',
        flex: 1,
        minWidth: 200,
    },
];

type NewCommandFormParameters = {
    commandName: string;
    namespace: string;
    description: string;
};

export const CommandView = () => {
    const connectionId = useConnectionIdFromRoute();

    const [searchInputValue, setSearchInputValue] = useState('');
    const [selectedProgramName, setSelectedProgramName] = useState('');

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJEb2xpdHRsZSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAiLCJleHAiOjE3MDk5MTUyODh9.iFgKYVlACXbF-jtRhH0VgQgb9S-l0Quw3oiUh2F33ig
    const [debouncedSearchTerm] = useDebounce(searchInputValue, 500);
    const query = useConnectionsIdMetadataProgramsSearchGet({ id: connectionId, query: debouncedSearchTerm });

    const searchResults = query.data?.programs || [];

    const title = 'Create New Command';

    const CommandSearchSection = () => {
        return (
            <ContentWithSubtitle title='Find the M3 program'>
                <TextField
                    value={searchInputValue}
                    size='medium'
                    placeholder='Search'
                    isFullWidth
                    startIcon='Search'
                    onValueChange={event => setSearchInputValue(event.target.value)}
                />

                <Collapse in={!!searchResults.length} timeout={100} mountOnEnter unmountOnExit>
                    <DataGridWrapper sx={{ mt: 3 }}>
                        <DataGridPro
                            {...dataGridDefaultProps}
                            rows={searchResults}
                            columns={programListingColumns}
                            getRowId={row => row.name}
                            onRowClick={({ row }) => handleRowClick(row)}
                            components={{
                                Toolbar: () => <DataGridCustomToolbar title='Found programs' />
                            }}
                        />
                    </DataGridWrapper>
                </Collapse>
            </ContentWithSubtitle>
        );
    };

    const handleRowClick = (row: ProgramsListingEntry) => {
        setSelectedProgramName(row.name);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title={title}
                // buttonsSlot={
                //     <CancelOrDiscardButton onCancelled={handleMessageMappingCancel} onDiscarded={() => setShowDiscardChangesDialog(true)} />
                // }
                sx={{ pb: 0 }}
            />

            <Form<NewCommandFormParameters>
                initialValues={{
                    commandName: '',
                    namespace: '',
                    description: '',
                }}
                onSubmit={() => { }}
            >
                <ContentWithSubtitle title='Command details' infoTooltipLabel='Provide a name, namespace and description for your command. Command name is required.'>
                    <InlineWrapper sx={{ alignItems: 'flex-start', gap: 4 }}>
                        <Input id='commandName' label='Command name' required pattern={{ value: alphaNumericCharsRegex, message: 'Can only contain characters or numbers.' }} />
                        <Input id='namespace' label='Namespace' />
                        <Input id='description' label='Description' />
                    </InlineWrapper>
                </ContentWithSubtitle>

                {selectedProgramName
                    ? (
                        <ContentWithSubtitle
                            title={`Selected program: ${selectedProgramName}`}
                            infoTooltipLabel={`This displays all the fields that are available for '${selectedProgramName}' program.`}
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
                            <Typography gutterBottom>Primary fields are necessary for the message type and have already been selected.</Typography>
                            <Typography>{`You can remap the M3 Description by adding a remapped name that makes sense for your organization’s business logic.`}</Typography>

                            <Typography sx={{ mt: 4, mb: 2 }}>Find API (transaction)</Typography>

                            <TextField
                                placeholder='Search transaction'
                                isFullWidth
                                startIcon='Search'
                                variant='outlined'
                                onValueChange={() => { }}
                            />

                            <DataGridWrapper sx={{ mt: 3 }}>
                                <DataGridPro
                                    {...dataGridDefaultProps}
                                    rows={[]}
                                    columns={[]}
                                    getRowId={row => row.name}
                                    components={{
                                        Toolbar: () => <DataGridCustomToolbar title='Found transactions' />
                                    }}
                                />
                            </DataGridWrapper>
                        </ContentWithSubtitle>
                    )
                    : <CommandSearchSection />
                }
            </Form>
        </ContentContainer>
    );
};

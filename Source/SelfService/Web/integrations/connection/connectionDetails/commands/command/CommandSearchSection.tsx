// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useDebounce } from 'use-debounce';

import { Collapse } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { AlertBox, ContentWithSubtitle, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, TextField } from '@dolittle/design-system';

import { useConnectionsIdMetadataProgramsSearchGet } from '../../../../../apis/integrations/programMetadataApi.hooks';

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
        minWidth: 400,
    },
    {
        field: 'transactionCount',
        headerName: 'Transaction count',
        flex: 1,
        minWidth: 200,
    },
];

export type CommandSearchSectionProps = {
    connectionId: string;
    searchInputValue: string;
    onSearchInputValueChange: (value: string) => void;
    onRowClick: (row: ProgramsListingEntry) => void;
};

export const CommandSearchSection = ({ connectionId, searchInputValue, onSearchInputValueChange, onRowClick }: CommandSearchSectionProps) => {
    const [debouncedSearchTerm] = useDebounce(searchInputValue, 500);
    const query = useConnectionsIdMetadataProgramsSearchGet({ id: connectionId, query: debouncedSearchTerm });

    const searchResults = query.data?.programs || [];

    return (
        <ContentWithSubtitle title='Find the M3 program'>
            <TextField
                value={searchInputValue}
                size='medium'
                placeholder='Search'
                isFullWidth
                startIcon='Search'
                onValueChange={event => onSearchInputValueChange(event.target.value)}
            />

            <Collapse in={!!searchResults.length} timeout={100} mountOnEnter unmountOnExit>
                <DataGridWrapper sx={{ mt: 3 }}>
                    <DataGridPro
                        {...dataGridDefaultProps}
                        rows={searchResults}
                        columns={programListingColumns}
                        getRowId={row => row.name}
                        onRowClick={({ row }) => onRowClick(row)}
                        components={{
                            Toolbar: () => <DataGridCustomToolbar title='Programs:' />
                        }}
                    />
                </DataGridWrapper>
            </Collapse>
        </ContentWithSubtitle>
    );
};

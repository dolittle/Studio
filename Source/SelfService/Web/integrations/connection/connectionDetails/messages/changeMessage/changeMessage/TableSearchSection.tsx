// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useDebounce } from 'use-debounce';

import { Typography } from '@mui/material';

import { ContentSection, TextField } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsTablesSearchGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionIdFromRoute } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { TableSearchResults } from '../components/TableSearchResults';

export type TableSearchSectionProps = ViewModeProps & {
    onTableSelected: (tableName: string) => void;
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
};

export const TableSearchSection = ({ onTableSelected, searchInput, setSearchInput }: TableSearchSectionProps) => {
    const connectionId = useConnectionIdFromRoute();
    const [debouncedSearchTerm] = useDebounce(searchInput, 500);
    const query = useConnectionsIdMessageMappingsTablesSearchGet({ id: connectionId, search: debouncedSearchTerm });

    const searchResults = query.data?.value || [];

    return (
        <ContentSection title='Browse M3 Tables'>
            <TextField
                value={searchInput}
                size='medium'
                placeholder='Search'
                isFullWidth
                startIcon='Search'
                onValueChange={e => setSearchInput(e.target.value)}
                sx={{ my: 3 }}
            />

            {!!searchResults.length &&
                <>
                    <Typography variant='body2' sx={{ mb: 3 }}>{`Select the table you'd like to map`}</Typography>
                    <TableSearchResults
                        tableListings={searchResults}
                        isLoading={query.isLoading}
                        onTableSelected={table => { onTableSelected(table.name!); }}
                    />
                </>
            }
        </ContentSection>
    );
};

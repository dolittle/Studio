// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { InputAdornment, TextField, Typography } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { TableListingEntry } from '../../../../../../apis/integrations/generated';
import { useConnectionsIdMessageMappingsTablesSearchGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';

import { useConnectionId } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';
import { TableSearchResults } from './TableSearchResults';

const SearchFieldAdornment = (
    <InputAdornment position='start'>
        <Icon icon='Search' size='medium' />
    </InputAdornment>
);

export type TableSearchSectionProps = ViewModeProps & {

};

export const TableSearchSection = (props: TableSearchSectionProps) => {
    const connectionId = useConnectionId();

    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedTable, setSelectedTable] = useState<TableListingEntry>();

    const [debouncedSearchTerm] = useDebounce(searchInput, 500);
    const query = useConnectionsIdMessageMappingsTablesSearchGet({ id: connectionId || '', search: debouncedSearchTerm });

    const searchResults = query.data?.value || [];
    const showTable = selectedTable?.name !== '';

    console.log('Selected Table', selectedTable);

    return (
        <ContentSection title='Browse M3 Table names'>
            <TextField
                fullWidth
                InputProps={{ startAdornment: SearchFieldAdornment }}
                placeholder='Search'
                sx={{ my: 3 }}
            />

            {/* SHOW SEARCH RESULTS HERE */}
            {/* Results: {query.data?.value?.length} */}

            {searchResults.length &&
                <TableSearchResults
                    tableListings={searchResults}
                    isLoading={query.isLoading}
                    onTableSelected={table => { setSelectedTable(table); }}
                />
            }
        </ContentSection>
    );
};

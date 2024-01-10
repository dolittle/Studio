// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useDebounce } from 'use-debounce';

import { Collapse } from '@mui/material';

import { ContentWithSubtitle, TextField } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsTablesSearchGet } from '../../../../../../../apis/integrations/mappableTablesApi.hooks';
import { useConnectionIdFromRoute } from '../../../../../../routes.hooks';

import { ViewModeProps } from '../../ViewMode';
import { TableSearchResults } from './TableSearchResults';

export type TableSearchSectionProps = ViewModeProps & {
    onTableSelected: (tableName: string) => void;
};

export const TableSearchSection = ({ onTableSelected }: TableSearchSectionProps) => {
    const connectionId = useConnectionIdFromRoute();

    const [searchInput, setSearchInput] = useState('');

    const [debouncedSearchTerm] = useDebounce(searchInput, 500);
    const query = useConnectionsIdMessageMappingsTablesSearchGet({ id: connectionId, search: debouncedSearchTerm });

    const searchResults = query.data?.value || [];

    return (
        <ContentWithSubtitle title='Browse M3 Tables'>
            <TextField
                value={searchInput}
                size='medium'
                placeholder='Search'
                isFullWidth
                startIcon='Search'
                onValueChange={event => setSearchInput(event.target.value)}
            />

            <Collapse in={!!searchResults.length} timeout={100} mountOnEnter unmountOnExit>
                <TableSearchResults tableListings={searchResults} isLoading={query.isLoading} onTableSelected={table => onTableSelected(table.name!)} />
            </Collapse>
        </ContentWithSubtitle>
    );
};

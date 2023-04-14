// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useDebounce } from 'use-debounce';

import { InputAdornment, TextField, Typography } from '@mui/material';

import { Icon } from '@dolittle/design-system';

import { useConnectionsIdMessageMappingsTablesSearchGet } from '../../../../../../apis/integrations/mappableTablesApi.hooks';

import { useConnectionId } from '../../../../../routes.hooks';

import { ViewModeProps } from '../ViewMode';
import { ContentSection } from './ContentSection';
import { TableSearchResults } from './TableSearchResults';

const SearchFieldAdornment =
    <InputAdornment position='start'>
        <Icon icon='Search' size='medium' />
    </InputAdornment>;

export type TableSearchSectionProps = ViewModeProps & {
    onTableSelected: (tableName: string) => void;
    searchInput: string;
    setSearchInput: (searchInput: string) => void;
};

export const TableSearchSection = ({ onTableSelected, searchInput, setSearchInput }: TableSearchSectionProps) => {
    const connectionId = useConnectionId();
    const [debouncedSearchTerm] = useDebounce(searchInput, 500);
    const query = useConnectionsIdMessageMappingsTablesSearchGet({ id: connectionId || '', search: debouncedSearchTerm });

    const searchResults = query.data?.value || [];

    return (
        <ContentSection title='Browse M3 Tables'>
            <TextField
                fullWidth
                InputProps={{ startAdornment: SearchFieldAdornment }}
                placeholder='Search'
                sx={{ my: 3 }}
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
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

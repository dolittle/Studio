// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { TextField } from '@mui/material';
import React, { useEffect, useCallback, useState } from 'react';
import { ButtonText } from '../theme/buttonText';

export type LogFilterDateRange = {
    start: number;
    stop: number;
};
export type LogFilterMicroservice = {
    name: string;
    id: string;
};

export type LogFilterObject = {
    searchTerms: string[];
    dateRange?: LogFilterDateRange;
    microservice?: LogFilterMicroservice[];
};


export type LogFilterPanelProps = {
    microservices?: LogFilterMicroservice[];
    filters: LogFilterObject;
    setSearchFilters: (filter: LogFilterObject) => void;
};

export const LogFilterPanel = ({ filters, setSearchFilters }: LogFilterPanelProps) => {

    const onUpdateFilters = (filters: LogFilterObject) => {
        setSearchFilters(filters);
    };

    const onSearched = (query: string) => {
        setSearchFilters({
            ...filters,
            searchTerms: filters.searchTerms.concat(query)
        });
    };

    return (
        <>
            <SearchFilter onSearch={onSearched} />
            <ActiveFilters filters={filters} updateFilters={onUpdateFilters} />
        </>
    );
};

export type SearchFilterProps = {
    onSearch: (query: string) => void;
};

export const SearchFilter = (props: SearchFilterProps) => {
    const [query, setQuery] = useState('');
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key.toLowerCase() === 'enter') {
            props.onSearch(query);
            setQuery('');
        }
    };
    return <div>
        <TextField
            onKeyDown={handleKeypress}
            onChange={handleOnChange}
            id={''}
            label={''}
            value={query}
            size='small'
            placeholder='Search'
        />
    </div>;
};


export type ActiveFiltersProps = {
    filters?: LogFilterObject;
    updateFilters: (filters: LogFilterObject) => void
};

export const ActiveFilters = (props: ActiveFiltersProps) => {
    const clearFilters = () => {
        props.updateFilters({ searchTerms: [] });
    }
    return <>
        <div>ActiveFilters: {props.filters?.searchTerms.join(', ')}</div>
        <div><ButtonText onClick={clearFilters}>Clear</ButtonText></div>
    </>;
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Grid } from '@mui/material';
import { ActiveFilters } from './activeFilters';
import { SearchFilter } from './searchFilter';

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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SearchFilter onSearch={onSearched} />
                </Grid>
                <Grid item xs={12}>
                    <ActiveFilters filters={filters} updateFilters={onUpdateFilters} />
                </Grid>
            </Grid>
        </>
    );
};


// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import { ActiveFilters } from './activeFilters';
import { SearchFilter } from './searchFilter';
import { MicroserviceFilter } from './microserviceFilter';
import { DateRangeFilter } from './dateRangeFilter';

export type LogFilterDateRange = 'live' | {
    start: bigint;
    stop: bigint;
};
export type LogFilterMicroservice = {
    name: string;
    id: string;
};

export type LogFilterObject = {
    searchTerms: string[];
    dateRange: LogFilterDateRange;
    microservice?: LogFilterMicroservice[];
};


export type LogFilterPanelProps = {
    microservices: LogFilterMicroservice[];
    filters: LogFilterObject;
    setSearchFilters: (filter: LogFilterObject) => void;
};

export const LogFilterPanel = ({ microservices, filters, setSearchFilters }: LogFilterPanelProps) => {

    const onUpdateFilters = useCallback((filters: LogFilterObject) => {
        setSearchFilters(filters);
    }, [setSearchFilters]);

    const onSearched = useCallback((query: string) => {
        setSearchFilters({
            ...filters,
            searchTerms: filters.searchTerms.concat(query)
        });
    }, [setSearchFilters]);

    const onSelectMicroservices = useCallback((selection: LogFilterMicroservice[]) => {
        setSearchFilters({
            ...filters,
            microservice: selection,
        });
    }, [setSearchFilters]);

    const onSetDateRange = useCallback((range: LogFilterDateRange) => {
        setSearchFilters({
            ...filters,
            dateRange: range,
        });
    }, [setSearchFilters]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <SearchFilter onSearch={onSearched} />
                </Grid>
                <Grid item xs={2}>
                    <MicroserviceFilter
                        availableMicroservices={microservices}
                        selectedMicroservices={filters.microservice}
                        onSelectMicroservices={onSelectMicroservices} />
                </Grid>
                <Grid item xs={2}>
                    <DateRangeFilter
                        range={filters.dateRange}
                        onSetDateRange={onSetDateRange} />
                </Grid>
                <Grid item xs={12}>
                    <ActiveFilters filters={filters} updateFilters={onUpdateFilters} />
                </Grid>
            </Grid>
        </>
    );
};


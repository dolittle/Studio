// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid } from '@mui/material';

import { ActiveFilters } from './activeFilters';
import { SearchFilter } from './searchFilter';
import { EnvironmentFilter } from './environmentFilter';
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
    environment?: string[];
    microservice?: LogFilterMicroservice[];
    dateRange: LogFilterDateRange;
};

export type LogFilterPanelProps = {
    environments: string[];
    microservices: LogFilterMicroservice[];
    filters: LogFilterObject;
    setSearchFilters: (filter: LogFilterObject) => void;
};

export const LogFilterPanel = ({ environments, microservices, filters, setSearchFilters }: LogFilterPanelProps) => {

    const onUpdateFilters = (filters: LogFilterObject) => {
        setSearchFilters(filters);
    };

    const onSearched = (query: string) => {
        setSearchFilters({
            ...filters,
            searchTerms: filters.searchTerms.concat(query)
        });
    };

    const onSelectEnvironments = (selection: string[]) => {
        setSearchFilters({
            ...filters,
            environment: selection,
        });
    };

    const onSelectMicroservices = (selection: LogFilterMicroservice[]) => {
        setSearchFilters({
            ...filters,
            microservice: selection,
        });
    };

    const onSetDateRange = (range: LogFilterDateRange) => {
        setSearchFilters({
            ...filters,
            dateRange: range,
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
                <SearchFilter onSearch={onSearched} />
            </Grid>

            <Grid item xs={12} lg={8} sx={{ '& > *': { py: 0.5 } }}>
                <EnvironmentFilter
                    availableEnvironments={environments}
                    selectedEnvironments={filters.environment}
                    onSelectEnvironments={onSelectEnvironments} />

                <MicroserviceFilter
                    availableMicroservices={microservices}
                    selectedMicroservices={filters.microservice}
                    onSelectMicroservices={onSelectMicroservices} />

                <DateRangeFilter
                    range={filters.dateRange}
                    onSetDateRange={onSetDateRange} />
            </Grid>

            <Grid item xs={12}>
                <ActiveFilters filters={filters} updateFilters={onUpdateFilters} />
            </Grid>
        </Grid>
    );
};

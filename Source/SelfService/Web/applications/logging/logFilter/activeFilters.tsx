// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { Button, Chip } from '@dolittle/design-system';

import { LogFilterMicroservice, LogFilterObject } from './logFilterPanel';

const Separator = () => <Typography component='span' sx={{ mx: 1 }}>|</Typography>;

export type ActiveFiltersProps = {
    filters: LogFilterObject;
    updateFilters: (filters: LogFilterObject) => void;
};

export const ActiveFilters = ({ updateFilters, filters }: ActiveFiltersProps) => {
    const clearFilters = () => {
        updateFilters({ ...filters, searchTerms: [], environment: [], microservice: [] });
    };

    const removeTerm = (term: string, index: number) => {
        const terms = [...filters.searchTerms];
        terms.splice(index, 1);
        updateFilters({
            ...filters,
            searchTerms: terms
        });
    };

    const removeEnvironment = (environment: string, index: number) => {
        if (filters.environment === undefined) return;

        const environments = [...filters.environment];
        environments.splice(index, 1);
        updateFilters({
            ...filters,
            environment: environments,
        });
    };

    const removeMicroservice = (microservice: LogFilterMicroservice, index: number) => {
        if (filters.microservice === undefined) return;

        const microservices = [...filters.microservice];
        microservices.splice(index, 1);
        updateFilters({
            ...filters,
            microservice: microservices
        });
    };

    const hasSearchTerms = filters.searchTerms.length > 0 ? true : false;
    const hasEnvironmentFilter = filters.environment?.length && filters.environment.length > 0 ? true : false;
    const hasMicroserviceFilter = filters.microservice?.length && filters.microservice.length > 0 ? true : false;
    const hasFilters = hasSearchTerms || hasEnvironmentFilter || hasMicroserviceFilter;

    return (
        <>
            <Button label='Clear Filters' disabled={!hasFilters} color='subtle' onClick={clearFilters} />

            {filters.searchTerms.map((term, index) =>
                <Chip
                    key={index}
                    label={`"${term}"`}
                    onDelete={() => removeTerm(term, index)}
                    sx={{ mx: 1 }}
                />
            )}

            {hasEnvironmentFilter && <Separator />}

            {filters.environment?.map((environment, index) =>
                <Chip
                    key={index}
                    label={environment}
                    onDelete={() => removeEnvironment(environment, index)}
                    sx={{ mx: 1 }}
                />
            )}

            {hasMicroserviceFilter && <Separator />}

            {filters.microservice?.map((microservice, index) =>
                <Chip
                    key={index}
                    label={microservice.name}
                    onDelete={() => removeMicroservice(microservice, index)}
                    sx={{ mx: 1 }}
                />
            )}

            <Separator />

            <Chip
                label={filters.dateRange === 'live' ? 'Live logs' : 'Date range'}
                sx={{ mx: 1 }}
            />
        </>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Chip, Typography } from '@mui/material';

import { LogFilterMicroservice, LogFilterObject } from './logFilterPanel';

import { Button } from '@dolittle/design-system';

export type ActiveFiltersProps = {
    filters: LogFilterObject;
    updateFilters: (filters: LogFilterObject) => void;
};

export const ActiveFilters = ({ updateFilters, filters }: ActiveFiltersProps) => {

    const clearFilters = () => {
        updateFilters({ ...filters, searchTerms: [] });
    };

    const removeTerm = (term: string, index: number) => {
        const terms = [...filters.searchTerms];
        terms.splice(index, 1);
        updateFilters({
            ...filters,
            searchTerms: terms
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

    return (
        <>
            <Button label='Clear Filters' disabled={filters.searchTerms.length === 0} color='subtle' onClick={clearFilters} />

            {filters.searchTerms.map((s, index) =>
                <Chip
                    key={index}
                    label={`"${s}"`}
                    onDelete={() => removeTerm(s, index)}
                    color='primary'
                    size='small'
                    sx={{ ml: 1 }}
                />
            )}

            <Typography variant='body1' component='span' sx={{ mx: 2 }}>|</Typography>

            {filters.microservice?.map((microservice, index) =>
                <Chip
                    key={index}
                    label={microservice.name}
                    onDelete={() => removeMicroservice(microservice, index)}
                    color='primary'
                    size='small'
                    sx={{ mr: 1 }}
                />
            )}

            <Chip
                label={filters.dateRange === 'live' ? 'Live logs' : 'Date range'}
                color='primary'
                size='small'
            />
        </>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Chip, Typography } from '@mui/material';
import React from 'react';
import { ButtonText } from '../../theme/buttonText';
import { LogFilterMicroservice, LogFilterObject } from './logFilterPanel';

export type ActiveFiltersProps = {
    filters: LogFilterObject;
    updateFilters: (filters: LogFilterObject) => void
};

export const ActiveFilters = (props: ActiveFiltersProps) => {

    const clearFilters = () => {
        props.updateFilters({ ...props.filters, searchTerms: [] });
    };

    const removeTerm = (term: string, index: number) => {
        const terms = [...props.filters.searchTerms];
        terms.splice(index, 1);
        props.updateFilters({
            ...props.filters,
            searchTerms: terms
        });
    };

    const removeMicroservice = (microservice: LogFilterMicroservice, index: number) => {
        if (props.filters.microservice === undefined) return;

        const microservices = [...props.filters.microservice];
        microservices.splice(index, 1);
        props.updateFilters({
            ...props.filters,
            microservice: microservices
        });
    };

    return (
        <>
            <ButtonText
                size='small'
                disabled={props.filters.searchTerms.length === 0}
                onClick={clearFilters}
                buttonType='secondary'
            >
                Clear Filters
            </ButtonText>
            {props.filters.searchTerms.map((s, index) =>
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
            {props.filters.microservice?.map((microservice, index) =>
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
                label={props.filters.dateRange === 'live' ? 'Live logs' : 'Date range'}
                color='primary'
                size='small'
            />
        </>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Chip, Typography } from '@mui/material';
import React from 'react';
import { ButtonText } from '../../theme/buttonText';
import { LogFilterObject } from './logFilterPanel';

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
                    key={index.toString()}
                    label={`"${s}"`}
                    onDelete={() => { removeTerm(s, index); }}
                    color='primary'
                    size='small'
                    sx={{ ml: 1 }}
                />
            )}
            <Typography variant='body1' component='span' sx={{ mx: 2 }}>|</Typography>
            <Chip
                label='Live logs'
                color='primary'
                size='small'
            />
        </>
    );
};

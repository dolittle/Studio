// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Select, SelectProps } from '@mui/material';

export type FilterSelectProps<T> = SelectProps<T>;

export const FilterSelect = <T,>(props: FilterSelectProps<T>) =>
    <Select
        {...props}
        variant='filled'
        disableUnderline
        sx={{
            //'p': 0,
            //'ml': 0,
            'typography': 'button',
            'mr': 1,
            'lineHeight': '1.4375em',
            'backgroundColor': 'transparent',
            '&:hover': { backgroundColor: 'background.paper' },
            '& .MuiSelect-icon': { color: 'inherit' },
            '& .MuiInputBase-input.MuiSelect-select': { py: 0.80 },
            '& .MuiInputBase-input.MuiSelect-select:focus': { backgroundColor: 'background.paper' },
        }}
    />;

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Select, SelectProps } from '@mui/material';

export type FilterSelectProps<T> = SelectProps<T>;

export const FilterSelect = <T,>(props: FilterSelectProps<T>) =>
    <Select
        {...props}
        variant='standard'
        sx={{
            ...props.sx,
            '&:before, &:hover:not(.Mui-disabled):before, &:after': {
                border: 'none',
            },
            'typography': 'button',
        }}
    />;

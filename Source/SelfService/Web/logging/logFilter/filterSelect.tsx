// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { FormControl, Select, SelectProps } from '@mui/material';

export type FilterSelectProps<T> = SelectProps<T>;

export const FilterSelect = <T,>(props: FilterSelectProps<T>) =>
    <FormControl variant='standard' sx={{ ml: 2 }}>
        <Select
            {...props}
            disableUnderline
            sx={{ typography: 'button' }}
        />
    </FormControl>;

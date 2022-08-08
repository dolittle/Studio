// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { themeDark } from '../../theme/theme';
import { Select, SelectProps } from '@mui/material';

const styles = {
    'padding': '5px 14px',
    'borderRadius': '4px',
    'transition': 'all .3s',
    '&:before, &:hover:not(.Mui-disabled):before, &:after': {
        border: 'none',
    },
    ':hover': {
        'background': 'rgba(140, 154, 248, 0.08)',
        '& svg': {
            color: themeDark.palette.primary.main
        }
    },
    'typography': 'button',
    '& svg': {
        right: '5px'
    },
    '.MuiSelect-select:focus': {
        backgroundColor: 'transparent'
    },
    '.MuiSelect-iconOpen': {
        color: themeDark.palette.primary.main
    },
};

export type FilterSelectProps<T> = SelectProps<T>;

export const FilterSelect = <T,>(props: FilterSelectProps<T>) =>
    <Select
        {...props}
        variant='standard'
        sx={{
            ...props.sx,
            ...styles
        }}
    />;

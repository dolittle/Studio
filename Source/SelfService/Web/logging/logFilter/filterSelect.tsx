// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, Select, SelectProps, Theme } from '@mui/material';

const styles = {
    wrapper: {
        '.MuiSelect-select:focus': {
            backgroundColor: 'transparent'
        },
        '.MuiSelect-iconOpen': {
            color: (theme: Theme) => theme.palette.primary.main
        },
        '& svg': {
            right: '-0.3125rem'
        },
        '&:before, &:hover:not(.Mui-disabled):before, &:after': {
            border: 'none',
        },
        ':hover': {
            '& svg': {
                color: (theme: Theme) => theme.palette.primary.main
            }
        },
    },
    inputField: {
        textDecoration: 'none',
        typography: 'button'
    }
};

export type FilterSelectProps<T> = SelectProps<T>;

export const FilterSelect = <T,>(props: FilterSelectProps<T>) =>
    <Button variant='text' disableRipple sx={styles.wrapper}>
        <Select
            {...props}
            variant='standard'
            disableUnderline
            sx={{ ...styles.inputField, ...props.sx }}
        />
    </Button>;

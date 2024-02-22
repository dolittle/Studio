// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridRenderCellParams } from '@mui/x-data-grid-pro';

import { Button } from '../../index';

const styles = {
    width: 1,
    height: 1,
    typography: 'body2',
    textTransform: 'none',
};

/**
 * These styles are required for DataGrid to make the select cell the same size as the other cells.
 */
// const styles = {
//     // Hack for secret cell active state. Otherwise size is going to be different.
//     '& .MuiOutlinedInput-root': {
//         '& .MuiSelect-select': { p: '5px 15px' },
//         '& fieldset': { border: 'none' },
//     },
// };

/**
 * Renders a select cell in 'view' mode in the DataGrid.
 */
export const DataGridSelectCellView = (params: GridRenderCellParams) =>
    <Button label={params.value} color='subtle' endWithIcon='ArrowDropDownRounded' sx={styles} />;

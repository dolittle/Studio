// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid-pro';

import { TextField } from '../../index';

const textFieldBorderStyles = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
    },
};

/**
 * Renders a editable text field cell in 'edit' mode in the DataGrid.
 */
export const DataGridEditCellEdit = (params: GridRenderCellParams<HTMLInputElement>) => {
    const { id, value, field } = params;
    const apiRef = useGridApiContext();

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
        <TextField
            value={value}
            placeholder='Edit...'
            endIcon='EditRounded'
            iconColor='primary'
            onValueChange={handleValueChange}
            sx={textFieldBorderStyles}
        />
    );
};

/**
 * Renders a editable text field cell in the 'view' mode in the DataGrid.
 */
export const DataGridEditCellView = (params: GridRenderCellParams) =>
    <TextField
        value={params.value}
        placeholder='Edit...'
        endIcon='EditRounded'
        sx={textFieldBorderStyles}
    />;

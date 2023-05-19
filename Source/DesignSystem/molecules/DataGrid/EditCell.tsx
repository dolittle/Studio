// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid-pro';

import { TextField } from '@dolittle/design-system';

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

export const EditTextFieldCell = (params: GridRenderCellParams<HTMLInputElement>) => {
    const { id, value, field } = params;
    const apiRef = useGridApiContext();

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
        <TextField
            value={value}
            startIcon='EditRounded'
            iconColor='primary'
            onValueChange={handleValueChange}
            sx={textFieldBorderStyles}
        />
    );
};

export const EditCell = (params: GridRenderCellParams) =>
    <TextField
        value={params.value}
        startIcon='EditRounded'
        sx={textFieldBorderStyles}
    />;

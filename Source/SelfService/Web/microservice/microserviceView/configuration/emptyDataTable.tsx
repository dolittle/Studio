// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button';

type EmptyDataTableProps = {
    title: string;
    description: string;
    buttonText: string;
    sx?: SxProps
    handleOnClick: () => void;
};

export const EmptyDataTable = ({ title, description, buttonText, sx, handleOnClick }: EmptyDataTableProps) => {
    return (
        <Paper sx={{ p: 2, ...sx }}>
            <Typography variant='h2'>{title}</Typography>
            <Typography variant='body1' sx={{ my: 2 }}>{description}</Typography>

            <Button
                variant='filled'
                label={buttonText}
                startWithIcon={<AddCircle />}
                isFullWidth
                sx={{
                    'backgroundColor': 'rgba(140, 154, 248, 0.08)',
                    'color': 'primary.main',
                    'minHeight': 30,
                    '&:hover': {
                        backgroundColor: 'rgba(140, 154, 248, 0.15)'
                    }
                }}
                onClick={() => handleOnClick()}
            />
        </Paper>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, SxProps, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { Button } from '@dolittle/design-system';

type EmptyDataTableProps = {
    title: string;
    description: string;
    buttonText: string;
    sx?: SxProps;
    handleOnClick: () => void;
};

export const EmptyDataTable = ({ title, description, buttonText, sx, handleOnClick }: EmptyDataTableProps) =>
    <Paper sx={{ p: 2, ...sx }}>
        <Typography variant='h2'>{title}</Typography>
        <Typography variant='body1' sx={{ my: 2 }}>{description}</Typography>

        <Button
            variant='fullwidth'
            label={buttonText}
            startWithIcon={<AddCircle />}
            onClick={() => handleOnClick()}
        />
    </Paper>;

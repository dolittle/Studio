// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button';

type NoConfigFilesProps = {
    handleOnClick: () => void;
};

export const NoConfigFiles = ({ handleOnClick }: NoConfigFilesProps) => {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant='h2'>No configuration files yet...</Typography>

            <Typography variant='body1' sx={{ my: 2 }}>
                {`To add your first configuration file, select 'add file'. You may select more than one at a time. Each file must be less than 3.145MB.`}
            </Typography>

            <Button
                variant='filled'
                label='Add File(s)'
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

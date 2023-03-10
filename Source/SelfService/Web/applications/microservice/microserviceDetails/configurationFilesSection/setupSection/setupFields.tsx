// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Select } from '@dolittle/design-system';

type SetupFieldsProps = {
    disabled: boolean;
    options: {
        value: string;
        displayValue: string;
    }[];
    sx: SxProps;
};

export const SetupFields = ({ disabled, options, sx }: SetupFieldsProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

        <Input id='microserviceName' label='Microservice Name' required disabled dashedBorder />
        <Input id='developmentEnvironment' label='Development Environment' disabled dashedBorder />

        <Select
            id='runtimeVersion'
            label='Runtime Version'
            options={options}
            required
            disabled={disabled}
            sx={{ '& fieldset': { borderStyle: 'dashed' } }}
        />
    </Box>;

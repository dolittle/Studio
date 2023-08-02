// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Select } from '@dolittle/design-system';

import { getRuntimes } from '../../../../../apis/solutions/api';

import { getRuntimeNumberFromString } from '../../../../../utils/helpers';

const environmentOptions = [
    { value: 'Dev', displayValue: 'Development' },
    { value: 'Prod', displayValue: 'Production' },
];

const runtimeNumberOptions = [
    ...getRuntimes().map(runtimeInfo => ({
        value: runtimeInfo.image,
        displayValue: getRuntimeNumberFromString(runtimeInfo.image),
    })),
    {
        value: 'none',
        displayValue: 'None',
    },
];

export type SetupFieldsProps = {
    disabled: boolean;
    sx: SxProps;
};

// TODO: Repeating code in deployMicroservice/setupFields.tsx.
// TODO: Add dashed border style to select component in design system.
export const SetupFields = ({ disabled, sx }: SetupFieldsProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

        <Input id='microserviceName' label='Microservice Name' required disabled dashedBorder />

        <Select
            id='developmentEnvironment'
            label='Development Environment'
            options={environmentOptions}
            required
            disabled
            sx={{ '& fieldset': { borderStyle: 'dashed' } }}
        />

        <Select
            id='runtimeVersion'
            label='Runtime Version'
            options={runtimeNumberOptions}
            required
            disabled={disabled}
            sx={{ '& fieldset': { borderStyle: 'dashed' } }}
        />
    </Box>;

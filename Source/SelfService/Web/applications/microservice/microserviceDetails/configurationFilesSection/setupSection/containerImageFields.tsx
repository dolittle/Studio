// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

import { HeadArguments } from '../../../components/form/headArguments';
import { alphaNumericLowerCasedCharsRegex } from '../../../../../utils/validation/patterns';

type ContainerImageFieldsProps = {
    disabled: boolean;
    sx: SxProps;
};

export const ContainerImageFields = ({ disabled, sx }: ContainerImageFieldsProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

        <Input
            id='headImage'
            label='Image Name'
            required
            disabled={disabled}
            dashedBorder
            sx={{ width: 1, maxWidth: 500, minWidth: 220 }}
        />

        <Input
            id='headPort'
            label='Port'
            disabled={disabled}
            required
            pattern={{
                value: alphaNumericLowerCasedCharsRegex,
                message: 'Please enter a valid port number.'
            }}
            dashedBorder
        />

        <Input
            id='entrypoint'
            label='Entrypoint'
            disabled={disabled}
            dashedBorder
        />

        <HeadArguments disabled={disabled} dashedBorder />
    </Box>;

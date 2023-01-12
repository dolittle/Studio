// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

import { HeadArguments } from './headArguments';

const entrypointDescription = `If you would like to override your container image ENTRYPOINT, 
you can do so in this field.You can find more information on ENTRYPOINTS and CMD ARGUMENETS here.`;


type ContainerImageFieldProps = {
    cmdArgs: string[];
    setCmdArgs: (args: string[]) => void;
    disabled?: boolean;
    sx: SxProps;
};

export const ContainerImageField = ({ cmdArgs, setCmdArgs, disabled, sx }: ContainerImageFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

        <Input
            id='headImage'
            label='Image Name'
            required
            disabled={disabled}
            sx={{ width: 500 }}
        />

        <Input
            id='headPort'
            label='Port'
            disabled={disabled}
            required
            pattern={{
                value: /^[0-9]+$/,
                message: 'Please enter a valid port number.'
            }}
        />

        <Input
            id='entrypoint'
            label='Entrypoint'
            disabled={disabled}
            tooltipTitle='ENTRYPOINT'
            tooltipText={entrypointDescription}
        />

        <HeadArguments cmdArgs={cmdArgs} setCmdArgs={setCmdArgs} disabled={disabled} />
    </Box>;

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input } from '@dolittle/design-system';

import { HeadArguments } from './headArguments';

type ContainerImageFieldProps = {
    cmdArgs: string[];
    setCmdArgs: (args: string[]) => void;
    disabled?: boolean;
    tooltipImageTitle?: string;
    tooltipImageText?: string;
    tooltipPortTitle?: string;
    tooltipPortText?: string;
    tooltipEntryTitle?: string;
    tooltipEntryText?: string;
    sx: SxProps;
};

export const ContainerImageField = (props: ContainerImageFieldProps) =>
    <Box sx={props.sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

        <Input
            id='headImage'
            label='Image Name'
            required
            disabled={props.disabled}
            tooltipTitle={props.tooltipImageTitle}
            tooltipText={props.tooltipImageText}
            sx={{ width: 500 }}
        />

        <Input
            id='headPort'
            label='Port'
            disabled={props.disabled}
            required
            pattern={{
                value: /^[0-9]+$/,
                message: 'Please enter a valid port number.'
            }}
            tooltipTitle={props.tooltipPortTitle}
            tooltipText={props.tooltipPortText}
        />

        <Input
            id='entrypoint'
            label='Entrypoint'
            disabled={props.disabled}
            tooltipTitle={props.tooltipEntryTitle}
            tooltipText={props.tooltipEntryText}
        />

        <HeadArguments cmdArgs={props.cmdArgs} setCmdArgs={props.setCmdArgs} disabled={props.disabled} />
    </Box>;

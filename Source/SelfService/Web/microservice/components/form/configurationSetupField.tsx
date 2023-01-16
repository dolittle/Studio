// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Select, Tooltip } from '@dolittle/design-system';

type ConfigurationSetupFieldProps = {
    options: { value: string }[];
    disabled?: boolean;
    tooltipTitle?: string;
    tooltipText?: string;
    sx?: SxProps;
};

export const ConfigurationSetupField = ({ options, disabled, tooltipTitle, tooltipText, sx }: ConfigurationSetupFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

        <Input id='microserviceName' label='Microservice Name' required disabled={disabled} />
        <Input id='developmentEnvironment' label='Development Environment' disabled />

        {/* TODO: Tooltip appears until select value has not changed. */}
        {tooltipTitle && tooltipText ?
            <Tooltip id='runtime-version-tooltip' tooltipTitle={tooltipTitle} tooltipText={tooltipText}>
                <Select
                    id='runtimeVersion'
                    label='Runtime Version'
                    options={options}
                    required
                    disabled={disabled}
                />
            </Tooltip> :
            <Select
                id='runtimeVersion'
                label='Runtime Version'
                options={options}
                required
                disabled={disabled}
            />
        }
    </Box>;

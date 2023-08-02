// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Select, Tooltip } from '@dolittle/design-system';

const environmentOptions = [
    { value: 'Dev', displayValue: 'Development' },
    { value: 'Prod', displayValue: 'Production' },
];

const runtimeDescription = `By using the Dolittle runtime you'll have access to storage through event sourcing and be able to 
communicate with other microservices through the event horizon with the Dolittle SDK.`;

type SelectField = {
    value: string;
    displayValue: string;
}[];

export type SetupFieldsProps = {
    runtimeOptions: SelectField;
    sx?: SxProps;
};

export const SetupFields = ({ runtimeOptions, sx }: SetupFieldsProps) => {
    const [showEnvironmentInfo, setShowEnvironmentInfo] = useState(false);
    const [showEntrypointInfo, setShowEntrypointInfo] = useState(false);

    return (
        <Box sx={sx}>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

            <Input id='microserviceName' label='Microservice Name' required='Provide a microservice name.' />

            <Tooltip
                tooltipTitle='Development Environment'
                tooltipText='The environment where your microservice will be deployed.'
                open={showEnvironmentInfo}
                handleOpen={() => setShowEnvironmentInfo(true)}
                handleClose={() => setShowEnvironmentInfo(false)}
            >
                <Select
                    id='developmentEnvironment'
                    label='Development Environment'
                    options={environmentOptions}
                    onOpen={() => setShowEnvironmentInfo(true)}
                    required
                    disabled
                />
            </Tooltip>

            <Tooltip
                tooltipTitle='Runtime'
                tooltipText={runtimeDescription}
                open={showEntrypointInfo}
                handleOpen={() => setShowEntrypointInfo(true)}
                handleClose={() => setShowEntrypointInfo(false)}
            >
                <Select
                    id='runtimeVersion'
                    label='Runtime Version'
                    options={runtimeOptions}
                    onOpen={() => setShowEntrypointInfo(true)}
                    required
                />
            </Tooltip>
        </Box>
    );
};

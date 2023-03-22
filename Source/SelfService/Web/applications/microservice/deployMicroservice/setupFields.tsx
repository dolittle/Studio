// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Select, Tooltip } from '@dolittle/design-system';

const runtimeDescription = `By using the Dolittle runtime you'll have access to storage through event sourcing and be able to 
communicate with other microservices through the event horizon with the Dolittle SDK.`;

type SetupFieldsProps = {
    options: {
        value: string;
        displayValue: string;
    }[];
    sx?: SxProps;
};

export const SetupFields = ({ options, sx }: SetupFieldsProps) => {
    const [showEntrypointInfo, setShowEntrypointInfo] = useState(false);

    return (
        <Box sx={sx}>
            <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

            <Input id='microserviceName' label='Microservice Name' required='Provide a microservice name.' />
            <Input id='developmentEnvironment' label='Development Environment' disabled />

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
                    options={options}
                    onOpen={() => setShowEntrypointInfo(true)}
                    required
                />
            </Tooltip>
        </Box>
    );
};

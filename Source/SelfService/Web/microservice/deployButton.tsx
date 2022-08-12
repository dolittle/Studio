// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Button, Paper } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

type DeployButtonProps = {
    handleClick: () => void
};

export const DeployButton = ({ handleClick }: DeployButtonProps) => {
    return (
        <Box component={Paper} mt={2.125}>
            <Button
                onClick={handleClick}
                startIcon={<RocketLaunch />}
                fullWidth
            >
                Deploy New Microservice
            </Button>
        </Box>
    );
};

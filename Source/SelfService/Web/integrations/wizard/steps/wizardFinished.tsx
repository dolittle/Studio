// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

export const WizardFinished = () =>
    <>
        <Typography variant='h4'>Success! Your M3 connector is setup and ready!</Typography>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
                If you’re ready, you can start mapping data with the connector. Or, feel free to explore Dolittle Studio
                and come back later to map data. When you are ready, simply go to the Connections tab on the left hand
                side and select the connector you would like to map data with.
            </Typography>
        </Box>

        <Box sx={{ maxWidth: 732, mt: 5.25, mx: 'auto' }}>
            <Button label='Back to ErP connections' color='subtle' variant='outlined' sx={{ mr: 3 }} />
            <Button label='Start mapping data' variant='filled' />
        </Box>
    </>;

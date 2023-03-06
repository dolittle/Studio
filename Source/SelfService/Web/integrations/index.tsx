// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes, useParams } from 'react-router-dom';

import { Box, Toolbar, Typography } from '@mui/material';

import { NavigationBar, SideBar } from '@dolittle/design-system';

import { routes } from './routes';

export const IntegrationsIndex = () => {
    const routesElement = useRoutes(routes);
    const { applicationId } = useParams();

    return (
        <Box sx={{ display: 'flex' }}>
            <NavigationBar />
            <SideBar />

            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />

                <Typography variant='h1'>Integrations</Typography>
                <Typography>Space: {applicationId}</Typography>
                {routesElement}
            </Box>
        </Box>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes, useParams } from 'react-router-dom';

import { Typography, Toolbar } from '@mui/material';

import { WorkSpaceLayout } from '../components/layout/workSpaceLayout/workSpaceLayout';
import { routes } from './routes';

export const IntegrationsIndex = () => {
    const routesElement = useRoutes(routes);
    const { applicationId } = useParams();

    return (
        <WorkSpaceLayout>
            <Toolbar>
                <Typography>Space: {applicationId}</Typography>
            </Toolbar>

            {routesElement}
        </WorkSpaceLayout>
    );
};

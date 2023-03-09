// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes, useParams } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Typography, Toolbar } from '@mui/material';

import { WorkSpaceLayout } from '../components/layout/workSpaceLayout/workSpaceLayout';
import { buildQueryClient } from '../apis/integrations/queryClient';
import { routes } from './routes';

export const IntegrationsIndex = () => {
    const queryClient = buildQueryClient();
    const routesElement = useRoutes(routes);
    const { applicationId } = useParams();

    return (
        <WorkSpaceLayout>
            <QueryClientProvider client={queryClient}>
                <Toolbar>
                    <Typography>Space: {applicationId}</Typography>
                </Toolbar>
                {routesElement}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </WorkSpaceLayout>
    );
};

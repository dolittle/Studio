// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box } from '@mui/material';

import { buildQueryClient } from '../apis/integrations/queryClient';

import { routes } from './routes';

import { WorkSpaceLayoutWithSidePanel } from '../components/layout/workSpaceLayout';
import { DebugRouter } from '../components/debugRouter';

export const IntegrationsIndex = () => {
    const queryClient = buildQueryClient();
    const routesElement = useRoutes(routes);

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Integrations'>
            {/* Temporary replacement for breadcrumbs */}
            <Box sx={{ minHeight: 16 }} />
            <QueryClientProvider client={queryClient}>
                <DebugRouter>
                    {routesElement}
                </DebugRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </WorkSpaceLayoutWithSidePanel>
    );
};

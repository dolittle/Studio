// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLocation, useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { buildQueryClient } from '../apis/integrations/queryClient';

import { integrationsBreadcrumbsNameMap, routes } from './routes';

import { WorkSpaceLayout } from '../components/layout/workSpaceLayout/workSpaceLayout';
import { DebugRouter } from '../components/debugRouter';

export const IntegrationsIndex = () => {
    const location = useLocation();
    const queryClient = buildQueryClient();
    const routesElement = useRoutes(routes);

    return (
        <WorkSpaceLayout
            breadcrumbs={{
                currentPath: location.pathname,
                breadcrumbsNameMap: integrationsBreadcrumbsNameMap,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <DebugRouter>
                    {routesElement}
                </DebugRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </WorkSpaceLayout>
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes, useParams } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from '@dolittle/design-system';

import { buildQueryClient } from '../apis/integrations/queryClient';

import { routes } from './routes';

import { DebugRouter } from '../components/debugRouter';

export const IntegrationsIndex = () => {
    const queryClient = buildQueryClient();
    const routesElement = useRoutes(routes);
    const { applicationId } = useParams();

    return (
        <Layout>
            <QueryClientProvider client={queryClient}>
                <DebugRouter>
                    {routesElement}
                </DebugRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Layout>
    );
};

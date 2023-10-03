// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useNavigate, useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../context/globalContext';

import { buildQueryClient } from '../apis/integrations/queryClient';

import { routes } from './routes';

import { WorkSpaceLayoutWithSidePanel } from '../layout/workSpaceLayout';
import { DebugRouter } from '../components/debugRouter';

export const IntegrationsIndex = () => {
    const queryClient = buildQueryClient();
    const routesElement = useRoutes(routes);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { currentApplicationId } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentApplicationId) {
            enqueueSnackbar('No application found with this ID.', { variant: 'error' });
            navigate('/applications');
            return;
        };

        setIsLoading(false);
    }, []);

    if (isLoading) return null;

    return (
        <WorkSpaceLayoutWithSidePanel pageTitle='Connections | Integrations'>
            <QueryClientProvider client={queryClient}>
                <DebugRouter>
                    {routesElement}
                </DebugRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </WorkSpaceLayoutWithSidePanel>
    );
};

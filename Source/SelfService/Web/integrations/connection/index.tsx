// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { useParams, Outlet, useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { useConnectionsIdGet } from '../../apis/integrations/connectionsApi.hooks';
import { DebugRouter } from '../../components/debugRouter';
import { Page } from '../../components/layout/page';
import { routes } from './routes';

import { useConnectionId } from '../routes.hooks';

const pendingStatuses = ['registered', 'pending'];

export const Connection = () => {
    const connectionId = useConnectionId();
    const routesElement = useRoutes(routes);
    const query = useConnectionsIdGet({ id: connectionId || '' });

    // const useNavigateIfStatusIsPending
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (query.data?.value && !location.pathname.includes('new')) {
            if (pendingStatuses.includes(query.data.value.status?.name?.toLowerCase() || '')) {
                navigate('new', { replace: true });
            }
        }
    }, [query.data, location.pathname]);

    if (query.isError) {
        return <>Something went wrong. Could not load connection details for {connectionId}</>;
    }

    return (
        <>
            <DebugRouter>
                {routesElement}
            </DebugRouter>
        </>
    );
};

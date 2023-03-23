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
    // Is there a connection for this id?
    // If not: show some error page
    // If connection, check status.
    // If status == Registered or pending => redirect to new
    // if not, show details page.

    const location = useLocation();
    const navigate = useNavigate();
    const connectionId = useConnectionId();
    const routesElement = useRoutes(routes);
    const query = useConnectionsIdGet({ id: connectionId || '' });
    // console.log(query.data?.value);

    useEffect(() => {
        if (query.data?.value && !location.pathname.includes('new')) {
            if (pendingStatuses.includes(query.data.value.status?.name?.toLowerCase() || '')) {
                navigate('new');
            }
        }
    }, [query.data, location.pathname]);

    return (
        <>
            {query.isSuccess ? (
                <DebugRouter>
                    {routesElement}
                </DebugRouter>

            )
                : (`Something went wrong. Could not load connection details for ${connectionId}`)
            }
        </>
    );
};

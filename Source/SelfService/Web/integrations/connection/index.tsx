// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes } from 'react-router-dom';

import { useConnectionsIdGet } from '../../apis/integrations/connectionsApi.hooks';

import { routes } from './routes';
import { useConnectionId } from '../routes.hooks';

import { DebugRouter } from '../../components/debugRouter';

export const Connection = () => {
    const connectionId = useConnectionId();
    const routesElement = useRoutes(routes);
    const query = useConnectionsIdGet({ id: connectionId || '' });

    if (query.isError) return <>Something went wrong. Could not load connection details for {connectionId}</>;

    return (
        <>
            <DebugRouter>
                {routesElement}
            </DebugRouter>
        </>
    );
};

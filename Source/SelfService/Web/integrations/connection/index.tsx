// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, Outlet, useRoutes } from 'react-router-dom';
import { useConnectionsIdGet } from '../../apis/integrations/connectionsApi.hooks';
import { DebugRouter } from '../../components/debugRouter';
import { Page } from '../../components/layout/page';
import { routes } from './routes';

export const Connection = () => {
    const { connectionId } = useParams();
    const routesElement = useRoutes(routes);
    const query = useConnectionsIdGet({ id: connectionId || '' });
    console.log(query.data?.value);

    return (
        <DebugRouter>
            {routesElement}
        </DebugRouter>
    );
};



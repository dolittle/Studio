// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useRoutes } from 'react-router-dom';

import { AlertBox } from '@dolittle/design-system';

import { useConnectionsIdGet } from '../../apis/integrations/connectionsApi.hooks';

import { routes } from './routes';
import { useConnectionIdFromRoute } from '../routes.hooks';

import { DebugRouter } from '../../components/debugRouter';

export const Connection = () => {
    const connectionId = useConnectionIdFromRoute();
    const routesElement = useRoutes(routes);

    const query = useConnectionsIdGet({ id: connectionId });

    if (query.isError) return <AlertBox message={`Could not load connection details for '${connectionId}'.`} />;

    return (
        <>
            <DebugRouter>
                {routesElement}
            </DebugRouter>
        </>
    );
};

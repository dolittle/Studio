// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams, Outlet, useRoutes } from 'react-router-dom';
import { DebugRouter } from '../../components/debugRouter';
import { Page } from '../../components/layout/page';
import { routes } from './routes';

export const NewConnection = () => {
    const { connectionsId } = useParams();
    const routesElement = useRoutes(routes);

    return (
        <Page title='New M3 Connection'>
            <DebugRouter>
                {routesElement}
            </DebugRouter>
        </Page>
    );
};



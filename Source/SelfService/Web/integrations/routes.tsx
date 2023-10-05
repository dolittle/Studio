// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject, Navigate } from 'react-router-dom';

import { Connection } from './connection';
import { Connections } from './connections';

export const integrationsBreadcrumbsNameMap: { [key: string]: string } = {
    '/integrations': 'Integrations',
    '/integrations/connections': 'Connections',
    '/integrations/connections/configuration': 'Configuration',
    '/integrations/connections/messages': 'Messages',
    '/integrations/connections/messages/new': 'New Message',
    '/integrations/connections/messages/edit': 'Edit Message',
    '/integrations/connections/expose': 'Expose Data',
    '/integrations/connections/new': 'New Connection',
};

export const routes: RouteObject[] = [
    {
        path: '',
        element: <Navigate to='connections' />,
        children: [],
    },
    {
        // List out all connections
        path: 'connections',
        element: <Connections />,
        children: [],
    },
    {
        // Show details for a single connection. Including creating a new one
        path: 'connections/:connectionId/*',
        element: <Connection />,
    },
];

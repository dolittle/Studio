// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { Connection } from './connection';

import { Connections } from './connections';
import { ConnectionsScreen } from './connectionsScreen';
import { Wizard } from './wizard/wizard';
import { NewConnectionSample } from './accordion/newConnection';
import { NewConnection } from './newConnection';

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
    {
        // Test page for starting a new connection wizard
        // to be removed
        path: 'connections/new/m3/:connectionId/*',
        element: <NewConnection />,
    },
    {
        // Test page for selecting connection type
        // to be removed
        path: 'connections/new-m3-connection',
        element: <ConnectionsScreen />,
        children: [],
    },
    {
        path: 'connections/new-m3-connection/wizard',
        element: <Wizard />,
        children: [],
    },
    {
        path: 'connections/new-m3-connection/accordion',
        element: <NewConnectionSample />,
        children: [],
    },
];

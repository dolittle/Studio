// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

import { Connections } from './connections';
import { ConnectionsScreen } from './connectionsScreen';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='connections' />,
        children: [],
    },
    {
        path: '/connections',
        element: <Connections />,
        children: [],
    },
    {
        path: '/bridge',
        element: <ConnectionsScreen />,
        //   errorElement: <ErrorPage />,
        children: [],
    },
];

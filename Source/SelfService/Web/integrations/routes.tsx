// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject, Navigate } from 'react-router-dom';

import { Connection } from './connection';
import { Connections } from './connections';

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

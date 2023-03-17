// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { ConnectionTypeStep } from './steps/connectionTypeStep';


export const routes: RouteObject[] = [
    {
        path: '',
        element: <Navigate to='connection-type' replace/>,
        children: [],
    },
    {
        path: 'connection-type',
        element: <ConnectionTypeStep />,
        children: [],
    },
];

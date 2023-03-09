// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { RouteObject } from 'react-router-dom';

import { HomeScreen } from './home';
import { ConnectionsScreen } from './connections';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomeScreen />,
        //   errorElement: <ErrorPage />,
        children: [],
    },
    {
        path: '/connections',
        element: <ConnectionsScreen />,
        //   errorElement: <ErrorPage />,
        children: [],
    },
];

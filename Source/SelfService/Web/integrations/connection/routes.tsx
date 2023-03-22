// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { ConnectionDetails } from './connectionDetails';
import { NewConnection } from './newConnection';


export const routes: RouteObject[] = [
    {
        //connection page
        path: '*',
        element: <ConnectionDetails />,
        children: [
            {
                path: 'configuration',
                element: <div>configuration</div>,
            },
            {
                path: 'messages',
                element: <div>messages</div>,
            },
            {
                path: 'expose',
                element: <div>expose</div>,
            },
        ],
    },
    {
        path: 'new/',
        element: <NewConnection />,
        children: [],
    },
];

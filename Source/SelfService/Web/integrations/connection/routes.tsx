// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RouteObject, Navigate } from 'react-router-dom';


export const routes: RouteObject[] = [
    {
        //connection page
        path: '',
        element: <div>Connection Screen</div>,
        children: [],
    },
    {
        path: 'new/',
        element: <div>new page, redirect to connection-page and replace in history if connection already exists</div>,
        children: [],
    },
];

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject, Navigate } from 'react-router-dom';

import { ConnectionDetails } from './connectionDetails';
import { ConfigurationView } from './connectionDetails/configuration';
import { ExposeView } from './connectionDetails/expose';
import { MessagesView } from './connectionDetails/messages/MessagesView';
import { MessagesViewRoot } from './connectionDetails/messages';
import { ChangeMessageView } from './connectionDetails/messages/changeMessage';

import { NewConnectionView } from './new';

export const routes: RouteObject[] = [
    {
        path: '*',
        element: <ConnectionDetails />,
        children: [
            {
                path: 'configuration',
                element: <ConfigurationView />,
            },
            {
                path: 'messages/*',
                element: <MessagesViewRoot />,
                children: [
                    {
                        path: '',
                        element: <MessagesView />,
                    },
                    {
                        path: 'new',
                        element: <ChangeMessageView />,
                    },
                    {
                        path: 'edit/:messageId',
                        element: <ChangeMessageView />,
                    },
                ]
            },
            {
                path: 'expose',
                element: <ExposeView />,
            },
        ],
    },
    {
        path: 'new/',
        element: <NewConnectionView />,
        children: [],
    },
];

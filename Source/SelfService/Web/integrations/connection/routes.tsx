// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject, Navigate } from 'react-router-dom';

import { ConnectionDetails } from './connectionDetails';
import { ConfigurationView } from './connectionDetails/configuration';
import { ExposeDataView } from './connectionDetails/exposeData';
import { MessagesListView } from './connectionDetails/messages/messagesList';
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
                        element: <MessagesListView />,
                    },
                    {
                        path: 'new',
                        element: <ChangeMessageView />,
                    },
                    {
                        path: 'edit/:table/:messageId',
                        element: <ChangeMessageView />,
                    },
                ]
            },
            {
                path: 'expose',
                element: <ExposeDataView />,
            },
        ],
    },
    {
        path: 'new/',
        element: <NewConnectionView />,
        children: [],
    },
];

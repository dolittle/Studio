// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject } from 'react-router-dom';

import { ConnectionDetails } from './connectionDetails';

import { ConfigurationView } from './connectionDetails/configuration';
import { MessagesListView } from './connectionDetails/messages/messagesList';
import { MessagesViewRoot } from './connectionDetails/messages';
import { Index as ChangeMessageView } from './connectionDetails/messages/message';
import { CommandsView } from './connectionDetails/commands/commandsList';
import { ConsumeDataView } from './connectionDetails/consumeData';

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
                ],
            },
            {
                path: 'commands/*',
                element: <CommandsView />,
                children: [
                    {
                        path: '',
                        element: <CommandsView />,
                    },
                    {
                        path: 'new',
                        element: <h1>New</h1>,
                    },
                    {
                        path: 'edit',
                        element: <h1>Edit</h1>,
                    },
                ],
            },
            {
                path: 'commands',
                element: <CommandsView />,
            },
            {
                path: 'consume-data',
                element: <ConsumeDataView />,
            },
        ],
    },
];

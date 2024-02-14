// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject } from 'react-router-dom';

import { ConnectionDetails } from './connectionDetails';

import { ConfigurationView } from './connectionDetails/configuration';
import { MessagesViewRoot } from './connectionDetails/messages';
import { MessagesListView } from './connectionDetails/messages/messagesList';
import { Index as ChangeMessageView } from './connectionDetails/messages/message';
import { CommandsViewRoot } from './connectionDetails/commands';
import { CommandsView } from './connectionDetails/commands/commandsList';
import { CommandView } from './connectionDetails/commands/command';
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
                element: <CommandsViewRoot />,
                children: [
                    {
                        path: '',
                        element: <CommandsView />,
                    },
                    {
                        path: 'new',
                        element: <CommandView />,
                    },
                    {
                        path: 'edit',
                        element: <h1>Edit</h1>,
                    },
                ],
            },
            {
                path: 'consume-data',
                element: <ConsumeDataView />,
            },
        ],
    },
];

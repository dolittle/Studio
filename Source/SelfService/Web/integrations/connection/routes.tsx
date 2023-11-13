// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouteObject } from 'react-router-dom';

import { ConnectionDetails } from './connectionDetails';
import { ConfigurationView } from './connectionDetails/configuration';
import { CommandsView } from './connectionDetails/commands';
import { ConsumeDataRestAPIView } from './connectionDetails/consumeDataRestAPI';
import { MessagesListView } from './connectionDetails/messages/messagesList';
import { MessagesViewRoot } from './connectionDetails/messages';
import { Index as ChangeMessageView } from './connectionDetails/messages/changeMessage';
import { ConsumeDataEventStreamsView } from './connectionDetails/consumeDataEventStreams';

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
                path: 'commands',
                element: <CommandsView />,
            },
            {
                path: 'consume-data-rest-api',
                element: <ConsumeDataRestAPIView />,
            },
            {
                path: 'consume-data-event-streams',
                element: <ConsumeDataEventStreamsView />,
            },
        ],
    },
];

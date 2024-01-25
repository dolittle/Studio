// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, Location } from 'react-router-dom';

export const childRoutePaths = ['/configuration', '/messages', '/consume-data'];

export const getSelectedTab = (location: Location) => {
    const pathname = location.pathname;
    const foundIndex = childRoutePaths.findIndex(path => pathname.includes(path));
    return foundIndex >= 0 ? foundIndex : 0;
};

export const connectionTabs = [
    {
        label: 'configuration',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'configuration',
        },
    },
    {
        label: 'message types',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'messages',
        },
    },
    /*     {
            label: 'commands',
            render: () => <></>,
            overrides: {
                component: Link,
                to: 'commands',
            },
        }, */
    {
        label: 'Consume Data',
        render: () => <></>,
        overrides: {
            component: Link,
            to: 'consume-data',
        },
    },
];

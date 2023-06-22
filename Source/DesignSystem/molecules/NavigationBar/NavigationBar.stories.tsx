// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Toolbar } from '@mui/material';

import { componentStories, DropdownMenuProps, NavigationBar } from '@dolittle/design-system';

import { CurrentPath, Link, Router } from '../../helpers/ReactRouter';

const primaryNavigationItems = [
    {
        label: 'Primary 1',
    },
    {
        label: 'Primary 2',
    },
    {
        label: 'Primary 3',
    },
];

const secondaryNavigationItems: DropdownMenuProps['menuItems'] = [
    {
        label: 'Secondary 1',
        icon: 'DescriptionRounded',
        overrides: {
            component: Link,
            to: '/secondary-1',
        },
    },
    {
        label: 'Secondary 2',
        icon: 'SupervisedUserCircleRounded',
        overrides: {
            component: Link,
            to: '/secondary-2',
        },
    },
    {
        label: 'Secondary 3',
        icon: 'LogoutRounded',
        overrides: {
            component: Link,
            to: '/secondary-3',
        },
    },
];

const selectionMenuItems: DropdownMenuProps['menuItems'] = [
    {
        label: 'Selection 1',
        icon: 'CheckRounded',
        overrides: {
            component: Link,
            to: '/selection-1',
        },
    },
    {
        label: 'Selection 2',
        overrides: {
            component: Link,
            to: '/selection-2',
        },
    },
    {
        label: 'Selection 3',
        icon: 'AddBoxRounded',
        overrides: {
            component: Link,
            to: '/selection-3',
        },
    },
];

const { metadata, createStory } = componentStories(NavigationBar, {
    decorator: Story =>
        <Router>
            <Toolbar />
            <CurrentPath />
            {Story()}
        </Router>
});

metadata.parameters = {
    docs: {
        description: {
            component: `The top navigation bar is always positioned at the top of the page and puts high priority destinations within reach on large screens. 
                        The top navigation bar uses a background and elevation of 4.`
        },
    },
};

metadata.args = {
    logo: 'AigonixLightCube',
    primaryNavigationItems,
    secondaryNavigationItems,
    selectionMenuItems,
};

export default metadata;

export const Default = createStory();

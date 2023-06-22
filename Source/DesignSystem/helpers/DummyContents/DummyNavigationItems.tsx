// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MenuListProps } from '@dolittle/design-system';

import { Link } from '../../helpers/ReactRouter';

export const menuItems: MenuListProps['menuListItem'] = [
    {
        label: 'Selected',
        icon: 'CheckRounded',
        overrides: {
            selected: true,
        },
    },
    {
        label: 'Link 2',
    },
    {
        label: 'Link 3',
        icon: 'LogoutRounded',
    },
];

export const primaryNavigationItems = [
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

export const selectionMenuItems: MenuListProps['menuListItem'] = [
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

export const secondaryNavigationItems: MenuListProps['menuListItem'] = [
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

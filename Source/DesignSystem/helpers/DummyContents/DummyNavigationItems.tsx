// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DropdownMenuProps, getPrimaryNavigationItems, getSecondaryNavigationItems, getSelectionMenuItems } from '../../index';

import { Link } from '../../helpers/ReactRouter';

export const PrimaryNavigation = () => {
    const primaryNavigationItems = [
        {
            label: 'default',
            overrides: {
                component: Link,
                to: '/primary-1',
            },
        },
        {
            label: 'Primary 2',
            overrides: {
                component: Link,
                to: '/primary-2',
            },
        },
        {
            label: 'Primary 3',
            overrides: {
                component: Link,
                to: '/primary-3',
            },
        },
    ];

    return getPrimaryNavigationItems(primaryNavigationItems);
};

export const SecondaryNavigation = () => {
    const secondaryNavigationItems: DropdownMenuProps['menuItems'] = [
        {
            id: 'secondary-1',
            label: 'Secondary 1',
            icon: 'DescriptionRounded',
            overrides: {
                component: Link,
                to: '/secondary-1',
            },
        },
        {
            id: 'secondary-2',
            label: 'Secondary 2',
            icon: 'SupervisedUserCircleRounded',
            overrides: {
                component: Link,
                to: '/secondary-2',
            },
        },
        {
            id: 'secondary-3',
            label: 'Secondary 3',
            icon: 'LogoutRounded',
            overrides: {
                component: Link,
                to: '/secondary-3',
            },
        },
    ];

    return getSecondaryNavigationItems(secondaryNavigationItems);
};

// TODO: Add useState to get selected item.
export const SelectionMenu = () => {
    const selectionMenuItems: DropdownMenuProps['menuItems'] = [
        {
            id: 'selection-1',
            label: 'Selection 1',
            icon: 'CheckRounded',
            overrides: {
                component: Link,
                to: '/selection-1',
            },
        },
        {
            id: 'selection-2',
            label: 'Selection 2',
            overrides: {
                component: Link,
                to: '/selection-2',
            },
        },
        {
            id: 'selection-3',
            label: 'Selection 3',
            icon: 'AddBoxRounded',
            overrides: {
                component: Link,
                to: '/selection-3',
            },
        },
    ];

    return getSelectionMenuItems(selectionMenuItems, 'Selection 1');
};

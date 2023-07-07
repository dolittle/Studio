// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import {
    DropdownMenuProps,
    Layout,
    LayoutProps,
    ListProps,
    getPrimaryNavigationItems,
    getSecondaryNavigationItems,
    getSelectionMenuItems,
    getSidePanelItems,
} from '../../index';

import { CurrentPath, Link } from '../../helpers/ReactRouter';

export const dummyLayoutBreadcrumbsNameMap: { [key: string]: string } = {
    '/primary-1': 'Primary 1',
    '/primary-2': 'Primary 2',
    '/primary-3': 'Primary 3',
    '/secondary-1': 'Secondary 1',
    '/secondary-2': 'Secondary 2',
    '/secondary-3': 'Secondary 3',
    '/primary-1/side-panel-link-1': 'Side panel link 1',
    '/primary-1/side-panel-link-2': 'Side panel link 2',
    '/primary-1/side-panel-link-3': 'Side panel link 3',
    '/primary-1/side-panel-link-4': 'Side panel link 4',
    '/primary-1/side-panel-link-5': 'Side panel link  5',
};

export const DummyLayoutBreadcrumbs = () => {
    const location = useLocation();

    return (
        <Layout
            navigationBar={dummyNavigationBar}
            sidePanel={dummySidePanel}
            breadcrumbs={{
                currentPath: location.pathname,
                breadcrumbsNameMap: dummyLayoutBreadcrumbsNameMap,
            }}
            sx={{ minHeight: 300 }}
        >
            <CurrentPath />
        </Layout>
    );
};

export const PrimaryNavigation = () => {
    const location = useLocation();

    const primaryNavigationItems = [
        {
            label: 'Primary 1',
            selected: location.pathname.includes('/primary-1'),
            overrides: {
                component: Link,
                to: '/primary-1',
            },
        },
        {
            label: 'Primary 2',
            selected: location.pathname.includes('/primary-2'),
            overrides: {
                component: Link,
                to: '/primary-2',
            },
        },
        {
            label: 'Primary 3',
            selected: location.pathname.includes('/primary-3'),
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

export const SelectionMenu = () => {
    const [selected, setSelected] = useState('Selection 1');

    const selectionMenuItems: DropdownMenuProps['menuItems'] = [
        {
            id: 'selection-1',
            label: 'Selection 1',
            icon: 'AigonixLightCube',
            onSelect: () => setSelected('Selection 1'),
        },
        {
            id: 'selection-2',
            label: 'Selection 2',
            onSelect: () => setSelected('Selection 2'),
        },
        {
            id: 'selection-3',
            label: 'Selection 3',
            icon: 'AddBoxRounded',
            onSelect: () => setSelected('Selection 3'),
        },
    ];

    return getSelectionMenuItems(selectionMenuItems, selected);
};

export const SidePanelNavigation = () => {
    const location = useLocation();

    const sidePanelItems: ListProps['listItems'] = [
        {
            label: 'Side panel link 1',
            icon: 'CheckRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/primary-1/side-panel-link-1',
                selected: location.pathname === '/primary-1/side-panel-link-1',
            },
        },
        {
            label: 'Side panel link 2',
            icon: 'SettingsRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/primary-1/side-panel-link-2',
                selected: location.pathname === '/primary-1/side-panel-link-2',
            },
        },
        {
            label: 'Side panel link 3',
            icon: 'HelpRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/primary-1/side-panel-link-3',
                selected: location.pathname === '/primary-1/side-panel-link-3',
            },
        },
        {
            label: 'Side panel link 4',
            icon: 'EditRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/primary-1/side-panel-link-4',
                selected: location.pathname === '/primary-1/side-panel-link-4',
            },
        },
        {
            label: 'Side panel link 5',
            icon: 'LogoutRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/primary-1/side-panel-link-5',
                selected: location.pathname === '/primary-1/side-panel-link-5',
            },
        },
    ];

    return getSidePanelItems(sidePanelItems);
};

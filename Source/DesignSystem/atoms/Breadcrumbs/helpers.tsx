// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useLocation } from 'react-router-dom';

import { Breadcrumbs, MenuList, MenuListProps } from '../../index';

import { Link } from '../../helpers/ReactRouter';

const dummyBreadcrumbsNameMap: { [key: string]: string } = {
    '/breadcrumb-1': 'Breadcrumb 1',
    '/breadcrumb-1/breadcrumb-2': 'Breadcrumb 2',
    '/breadcrumb-1/breadcrumb-2/breadcrumb-3': 'Breadcrumb 3',
    '/breadcrumb-1/breadcrumb-2/breadcrumb-3/breadcrumb-4': 'Last breadcrumb',
};

export const DummyBreadcrumbs = () => {
    const location = useLocation();

    return (
        <Breadcrumbs currentPath={location.pathname} breadcrumbsNameMap={dummyBreadcrumbsNameMap} />
    );
};

export const DummyListMenu = () => {
    const location = useLocation();

    const items: MenuListProps['listItems'] = [
        {
            label: 'Navigate to breadcrumb 1',
            icon: 'Explore',
            overrides: {
                component: Link,
                to: '/breadcrumb-1',
                selected: location.pathname === '/breadcrumb-1',
            },
        },
        {
            label: 'Navigate to breadcrumb 2',
            icon: 'Explore',
            overrides: {
                component: Link,
                to: '/breadcrumb-1/breadcrumb-2',
                selected: location.pathname === '/breadcrumb-1/breadcrumb-2',
            },
        },
        {
            label: 'Navigate to breadcrumb 3',
            icon: 'Explore',
            overrides: {
                component: Link,
                to: '/breadcrumb-1/breadcrumb-2/breadcrumb-3',
                selected: location.pathname === '/breadcrumb-1/breadcrumb-2/breadcrumb-3',
            },
        },
        {
            label: 'Navigate to breadcrumb 4',
            icon: 'Explore',
            overrides: {
                component: Link,
                to: '/breadcrumb-1/breadcrumb-2/breadcrumb-3/breadcrumb-4',
                selected: location.pathname === '/breadcrumb-1/breadcrumb-2/breadcrumb-3/breadcrumb-4',
            },
        },
    ];

    return (
        <MenuList listItems={items} withIcons withSelectedItem initialySelectedItem={3} sx={{ width: 'fit-content', mt: 2 }} />
    );
};

// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../../context/globalContext';

import { getPrimaryNavigationItems, getSecondaryNavigationItems, getSidePanelItems, ListProps, MenuItemProps } from '@dolittle/design-system';

export const PrimaryNavigation = () => {
    const { currentApplicationId } = useGlobalContext();

    const primaryNavigationItems = [
        {
            label: 'home',
            overrides: {
                component: Link,
                to: '/home',
            },
        },
        {
            label: 'applications',
            overrides: {
                component: Link,
                to: `/microservices/application/${currentApplicationId}/Dev/overview`,
            },
        },
        {
            label: 'integrations',
            overrides: {
                component: Link,
                to: '/integrations',
            },
        },
    ];

    return getPrimaryNavigationItems(primaryNavigationItems);
};

export const SecondaryNavigation = () => {
    const { hasOneCustomer, currentApplicationId } = useGlobalContext();

    const secondaryNavigationItems: MenuItemProps[] = [
        {
            id: 'documentation',
            label: 'Documentation',
            icon: 'DescriptionRounded',
            overrides: {
                component: Link,
                to: `/documentation/application/${currentApplicationId}/Dev/overview`,
            },
        },
        {
            id: 'log-out',
            label: 'Log out',
            icon: 'LogoutRounded',
            overrides: {
                component: 'a',
                href: '/.auth/cookies/logout',
            },
        },
    ];

    if (!hasOneCustomer) {
        // Put after documentation link if there is more than one customer.
        secondaryNavigationItems.splice(secondaryNavigationItems.length - 1, 0, {
            id: 'change-organization',
            label: 'Change Organization',
            icon: 'SupervisedUserCircleRounded',
            overrides: {
                component: 'a',
                href: '/.auth/cookies/initiate',
            },
        });
    }

    return getSecondaryNavigationItems(secondaryNavigationItems);
};

export const SidePanelItems = () => {
    const sidePanelItems: ListProps['listItems'] = [
        {
            label: 'Side panel link 1',
            icon: 'CheckRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/side-panel-link-1',
            },
        },
        {
            label: 'Side panel link 2',
            icon: 'SettingsRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/side-panel-link-2',
            },
        },
        {
            label: 'Side panel link 3',
            icon: 'HelpRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/side-panel-link-3',
            },
        },
        {
            label: 'Side panel link 4',
            icon: 'EditRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/side-panel-link-4',
            },
        },
        {
            label: 'Side panel link 5',
            icon: 'LogoutRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: '/side-panel-link-5',
            },
        },
    ];

    return getSidePanelItems(sidePanelItems);
};

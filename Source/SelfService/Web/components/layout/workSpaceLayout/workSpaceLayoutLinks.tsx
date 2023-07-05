// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../../context/globalContext';

import { getPrimaryNavigationItems, getSecondaryNavigationItems, getSidePanelItems, ListProps, MenuItemProps } from '@dolittle/design-system';

export const PrimaryNavigation = () => {
    const { currentApplicationId } = useGlobalContext();

    const applicationHref = `/microservices/application/${currentApplicationId}/Dev/overview`;

    const primaryNavigationItems = [
        {
            label: 'home',
            href: '/home',
            overrides: {
                component: Link,
                to: '/home',
            },
        },
        {
            label: 'applications',
            href: applicationHref,
            overrides: {
                component: Link,
                to: applicationHref,
            },
        },
        {
            label: 'integrations',
            href: '/integrations',
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

export const SidePanelApplicationItems = () => {
    const { currentApplicationId, currentEnvironment } = useGlobalContext();

    const sidePanelItems: ListProps['listItems'] = [
        {
            label: 'Microservices',
            icon: 'HexagonRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: `/microservices/application/${currentApplicationId}/${currentEnvironment}/overview`,
            },
        },
        {
            label: 'Backups',
            icon: 'BackupRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: `/backups/application/${currentApplicationId}/overview`,
            },
        },
        {
            label: 'Container Registry',
            icon: 'ContainerRegistry',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: `/containerregistry/application/${currentApplicationId}/${currentEnvironment}/overview`,
            },
        },
        {
            label: 'Logs',
            icon: 'TextSnippetRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: `/logs/application/${currentApplicationId}/${currentEnvironment}`,
            },
        },
    ];

    return getSidePanelItems(sidePanelItems);
};

export const SidePanelIntegrationItems = () => {
    const { currentApplicationId, currentEnvironment } = useGlobalContext();

    const sidePanelItems: ListProps['listItems'] = [
        {
            label: 'ERP Connections',
            icon: 'PolylineRounded',
            sx: { my: 1 },
            overrides: {
                component: Link,
                to: `/m3connector/application/${currentApplicationId}/${currentEnvironment}/details`,
            },
        },
    ];

    return getSidePanelItems(sidePanelItems);
};

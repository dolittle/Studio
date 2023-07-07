// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { useGlobalContext } from '../../../context/globalContext';

import { getPrimaryNavigationItems, getSecondaryNavigationItems, getSidePanelItems, LayoutProps, ListProps, MenuItemProps } from '@dolittle/design-system';

import { SpaceSelectMenu } from './spaceSelectMenu';

const PrimaryNavigation = () => {
    const location = useLocation();
    const { currentApplicationId } = useGlobalContext();

    const primaryNavigationItems = [
        {
            label: 'home',
            selected: location.pathname.includes('/home'),
            overrides: {
                component: Link,
                to: '/home',
            },
        },
        {
            label: 'applications',
            selected: location.pathname.includes('/microservices'),
            overrides: {
                component: Link,
                to: `/microservices/application/${currentApplicationId}/Dev/overview`,
            },
        },
        {
            label: 'integrations',
            selected: location.pathname.includes('/integrations'),
            overrides: {
                component: Link,
                to: '/integrations',
            },
        },
    ];

    return getPrimaryNavigationItems(primaryNavigationItems);
};

const SecondaryNavigation = () => {
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
        // Put before log out link if there is more than one customer.
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

const SidePanelApplicationItems = () => {
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

const SidePanelIntegrationItems = () => {
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

export const mainNavigationItems: LayoutProps['navigationBar'] = {
    logo: 'AigonixLightCube',
    primaryNavigationItems: <PrimaryNavigation />,
    selectionMenuItems: <SpaceSelectMenu />,
    secondaryNavigationItems: <SecondaryNavigation />,
};

export const applicationsSidePanel: LayoutProps['sidePanel'] = {
    sidePanelNavigationItems: <SidePanelApplicationItems />,
};

export const integrationsSidePanel: LayoutProps['sidePanel'] = {
    sidePanelNavigationItems: <SidePanelIntegrationItems />,
};
